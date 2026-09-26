// Núcleo WebGL sin framework (mismo patrón que ShaderCanvas.vue del portafolio).
// Se puede importar tal cual desde Vue o Angular.

const VERT = `#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

type U = number | [number, number] | [number, number, number] | [number, number, number, number];

interface Tween { from: number; to: number; start: number; ms: number; }

export class ShaderCanvas {
  private gl: WebGL2RenderingContext;
  private prog: WebGLProgram;
  private raf = 0;
  private locs = new Map<string, WebGLUniformLocation | null>();
  private tweens = new Map<string, Tween>();
  private t0 = performance.now();
  private dpr = 1;
  readonly uniforms: Record<string, U> = {};
  /** Hook por frame (p.ej. seguir el rect de la card en hover durante scroll). */
  beforeDraw?: () => void;

  constructor(private canvas: HTMLCanvasElement, frag: string, private scale = 0.6) {
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: false });
    if (!gl) throw new Error('WebGL2 no disponible');
    this.gl = gl;
    this.prog = this.link(VERT, frag);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(this.prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  }

  /** Llamar antes de crear texturas dependientes del tamaño (bug makeTextCanvas). */
  resize() {
    this.dpr = Math.min(devicePixelRatio || 1, 1.5) * this.scale;
    const w = Math.max(1, Math.round(this.canvas.clientWidth * this.dpr));
    const h = Math.max(1, Math.round(this.canvas.clientHeight * this.dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w; this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
  }

  /** Factor CSS px → px del canvas, para pasar rects del DOM al shader. */
  get pixelRatio() { return this.dpr; }

  set(name: string, v: U) { this.uniforms[name] = v; this.tweens.delete(name); }

  tween(name: string, to: number, ms = 500, from?: number) {
    const cur = typeof this.uniforms[name] === 'number' ? this.uniforms[name] as number : 0;
    this.tweens.set(name, { from: from ?? cur, to, start: performance.now(), ms });
  }

  start() {
    const loop = (now: number) => { this.draw(now); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }

  stop() { cancelAnimationFrame(this.raf); this.raf = 0; }
  get running() { return this.raf !== 0; }

  dispose() {
    this.stop();
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  private draw(now: number) {
    const gl = this.gl;
    this.beforeDraw?.();
    for (const [k, t] of this.tweens) {
      const p = Math.min(1, (now - t.start) / t.ms);
      const e = 1 - Math.pow(1 - p, 3);
      this.uniforms[k] = t.from + (t.to - t.from) * e;
      if (p >= 1) this.tweens.delete(k);
    }
    gl.useProgram(this.prog);
    this.u('u_time', (now - this.t0) / 1000);
    this.u('u_res', [this.canvas.width, this.canvas.height]);
    for (const k in this.uniforms) this.u(k, this.uniforms[k]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private u(name: string, v: U) {
    if (!this.locs.has(name)) this.locs.set(name, this.gl.getUniformLocation(this.prog, name));
    const l = this.locs.get(name);
    if (!l) return;
    if (typeof v === 'number') this.gl.uniform1f(l, v);
    else if (v.length === 2) this.gl.uniform2fv(l, v);
    else if (v.length === 3) this.gl.uniform3fv(l, v);
    else this.gl.uniform4fv(l, v);
  }

  private link(vs: string, fs: string) {
    const gl = this.gl;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link');
    return p;
  }
}
