import test from 'node:test';
import assert from 'node:assert/strict';
import { WebGLEngine } from '../src/webgl-engine.js';

/* -------------------------------------------------------------
   Sahte WebGL2RenderingContext ve canvas
   Node ortamında gerçek WebGL2 yok, bu yüzden motoru
   sanal bir GL arayüzü üzerinden test ederiz.
   ------------------------------------------------------------- */
function makeMockGl() {
  const calls = [];
  const gl = {
    // Sabitler
    VERTEX_SHADER: 1,
    FRAGMENT_SHADER: 2,
    COMPILE_STATUS: 3,
    LINK_STATUS: 4,
    FRAMEBUFFER: 5,
    COLOR_ATTACHMENT0: 6,
    TEXTURE_2D: 7,
    TEXTURE0: 8,
    ARRAY_BUFFER: 9,
    STATIC_DRAW: 10,
    FLOAT: 11,
    TRIANGLES: 12,
    CLAMP_TO_EDGE: 13,
    LINEAR: 14,
    RGBA: 15,
    UNSIGNED_BYTE: 16,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 17,
    drawingBufferColorSpace: null,
    _calls: calls
  };
  const obj = () => ({ id: Math.random() });
  const fn = (name) => (...args) => calls.push([name, ...args]);
  const retTrue = () => true;

  gl.createShader = obj;
  gl.shaderSource = fn('shaderSource');
  gl.compileShader = retTrue;
  gl.getShaderParameter = retTrue;
  gl.getShaderInfoLog = () => '';
  gl.deleteShader = fn('deleteShader');

  gl.createProgram = obj;
  gl.attachShader = fn('attachShader');
  gl.linkProgram = retTrue;
  gl.getProgramParameter = retTrue;
  gl.getProgramInfoLog = () => '';
  gl.deleteProgram = fn('deleteProgram');

  gl.createVertexArray = obj;
  gl.bindVertexArray = fn('bindVertexArray');
  gl.createBuffer = obj;
  gl.bindBuffer = fn('bindBuffer');
  gl.bufferData = fn('bufferData');
  gl.enableVertexAttribArray = fn('enableVertexAttribArray');
  gl.vertexAttribPointer = fn('vertexAttribPointer');

  gl.createTexture = obj;
  gl.bindTexture = fn('bindTexture');
  gl.texParameteri = fn('texParameteri');
  gl.texImage2D = fn('texImage2D');
  gl.pixelStorei = fn('pixelStorei');

  gl.createFramebuffer = obj;
  gl.bindFramebuffer = fn('bindFramebuffer');
  gl.framebufferTexture2D = fn('framebufferTexture2D');

  gl.getUniformLocation = obj;
  gl.uniform1i = fn('uniform1i');
  gl.uniform2f = fn('uniform2f');
  gl.uniform4f = fn('uniform4f');
  gl.uniform1f = fn('uniform1f');
  gl.uniform3f = fn('uniform3f');

  gl.useProgram = fn('useProgram');
  gl.activeTexture = fn('activeTexture');
  gl.drawArrays = (mode, first, count) => calls.push(['drawArrays', mode, first, count]);
  gl.viewport = fn('viewport');

  gl.deleteFramebuffer = fn('deleteFramebuffer');
  gl.deleteTexture = fn('deleteTexture');
  gl.deleteBuffer = fn('deleteBuffer');
  gl.deleteVertexArray = fn('deleteVertexArray');

  return gl;
}

function makeCanvas(glResult) {
  const listeners = {};
  return {
    width: 192,
    height: 108,
    style: {},
    getContext: () => glResult,
    addEventListener: (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); },
    dispatchEvent: (evt) => { (listeners[evt.type] || []).forEach((fn) => fn(evt)); }
  };
}

test('WebGLEngine.isSupported() bir boolean döner; Node ortamında WebGL2 yoksa false', () => {
  assert.equal(typeof WebGLEngine.isSupported(), 'boolean');
  assert.equal(WebGLEngine.isSupported(), false);
});

test('WebGL2 yoksa motor hazırlanamaz ama hata fırlatmaz', () => {
  const canvas = makeCanvas(null);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  assert.equal(engine.isReady, false);
  assert.equal(engine.gl, null);
  assert.equal(engine.lostContext, false);

  engine.destroy();
  assert.equal(engine.gl, null);
  assert.equal(engine.isReady, false);
});

test('Sanal WebGL2 ile başlatma başarılı olur: programlar ve 3 basamaklı FBO piramidi oluşturulur', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'display-p3' });

  assert.equal(engine.isReady, true);
  assert.equal(engine.gl, gl);
  assert.equal(engine.fboPyramid.length, 3);
  assert.ok(engine.programs.downsample);
  assert.ok(engine.programs.upsample);
  assert.ok(engine.programs.final);
  assert.equal(gl.drawingBufferColorSpace, 'display-p3');
});

test('Motor hazır değilse render çizim çağrısı yapmaz', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  engine.isReady = false;
  const video = { readyState: 2 };
  engine.render(video, {});

  assert.equal(gl._calls.filter((c) => c[0] === 'drawArrays').length, 0);
});

test('Motor hazır olduğunda Dual-Kawase boru hattı drawArrays çağırır', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  const video = { readyState: 2, videoWidth: 640, videoHeight: 360 };
  engine.render(video, {
    brightness: 1,
    contrast: 1,
    saturation: 1,
    kelvin: 6500,
    edgeWeights: [1, 1, 1, 1]
  });

  const drawCalls = gl._calls.filter((c) => c[0] === 'drawArrays');
  // 3 downsample + 2 upsample + 1 final = 6
  assert.ok(drawCalls.length >= 6, `en az 6 drawArrays çağrısı beklenir, elde: ${drawCalls.length}`);
  assert.ok(gl._calls.some((c) => c[0] === 'texImage2D'), 'video doku texture yüklenmeli');
});

test('resize canvas boyutlarını günceller ve FBO piramidini yeniden kurar', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  engine.resize(320, 180);

  assert.equal(canvas.width, 320);
  assert.equal(canvas.height, 180);
  assert.equal(engine.fboPyramid.length, 3);
});

test('destroy WebGL kaynaklarını temizler', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  engine.destroy();

  assert.equal(engine.gl, null);
  assert.equal(engine.isReady, false);
  assert.equal(engine.fboPyramid.length, 0);
});

test('webglcontextlost / webglcontextrestored hazırlık durumunu değiştirir', () => {
  const gl = makeMockGl();
  const canvas = makeCanvas(gl);
  const engine = new WebGLEngine(canvas, { colorSpace: 'srgb' });

  assert.equal(engine.isReady, true);

  canvas.dispatchEvent({ type: 'webglcontextlost', preventDefault: () => {} });
  assert.equal(engine.lostContext, true);
  assert.equal(engine.isReady, false);

  canvas.dispatchEvent({ type: 'webglcontextrestored', preventDefault: () => {} });
  assert.equal(engine.lostContext, false);
  assert.equal(engine.isReady, true);
});
