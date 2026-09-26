// Fondo: flujo de ruido con domain warping + glow alrededor de la card en hover
// + onda que se expande cuando cambian los filtros o el layout.
export const BACKDROP_FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;   // px canvas, origen abajo-izq
uniform vec4  u_rect;    // x, y, w, h en px canvas (origen abajo-izq)
uniform float u_hover;   // 0..1
uniform float u_pulse;   // 0..1 onda de filtro
uniform vec2  u_pulseAt; // centro de la onda en px canvas
uniform vec3  u_colA;
uniform vec3  u_colB;
uniform vec3  u_base;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for(int i = 0; i < 5; i++){ v += a*noise(p); p = r*p*2.02; a *= 0.5; }
  return v;
}
float sdRoundBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  float m = min(u_res.x, u_res.y);
  vec2 uv = frag / m;
  float t = u_time * 0.045;

  // domain warping
  vec2 q = vec2(fbm(uv*1.6 + t), fbm(uv*1.6 - t + 4.1));
  vec2 r = vec2(fbm(uv*1.9 + 3.0*q + vec2(1.7, 9.2) + t*1.3), fbm(uv*1.9 + 3.0*q + vec2(8.3, 2.8) - t));
  float f = fbm(uv*1.4 + 2.6*r);

  vec3 col = u_base;
  col = mix(col, u_colA * 0.55, smoothstep(0.35, 0.95, f) * 0.85);
  col = mix(col, u_colB * 0.5, smoothstep(0.55, 1.0, r.x) * 0.55);
  // vetas finas
  float vein = smoothstep(0.02, 0.0, abs(f - 0.62)) * 0.35;
  col += u_colA * vein;

  // luz del mouse
  float md = length(frag - u_mouse) / m;
  col += u_colA * 0.08 * exp(-md*md*14.0);

  // onda de filtro
  float pd = length(frag - u_pulseAt) / m;
  float ring = u_pulse * exp(-pow((pd - (1.0 - u_pulse) * 1.3) * 9.0, 2.0));
  col += mix(u_colA, u_colB, 0.5) * ring * 0.6;

  // glow alrededor de la card en hover
  vec2 c = u_rect.xy + u_rect.zw * 0.5;
  float d = sdRoundBox(frag - c, u_rect.zw * 0.5, 18.0 * (u_res.x / max(u_res.x, 1.0)));
  float glow = exp(-max(d, 0.0) / (m * 0.035)) * u_hover;
  vec3 gcol = mix(u_colA, u_colB, 0.5 + 0.5 * sin(u_time * 1.2 + frag.x / m * 3.0));
  col += gcol * glow * 0.75;

  // viñeta
  vec2 v = frag / u_res - 0.5;
  col *= 1.0 - dot(v, v) * 0.9;

  o = vec4(col, 1.0);
}`;
