import { Injectable, NgZone, inject, signal } from '@angular/core';
import { ShaderCanvas } from './shader-canvas';

@Injectable({ providedIn: 'root' })
export class FxService {
  private zone = inject(NgZone);
  private sc?: ShaderCanvas;
  private hovered?: HTMLElement;
  
  readonly enabled = signal(false);

  register(sc: ShaderCanvas) {
    this.sc = sc;
    this.enabled.set(true);
    sc.set('u_colA', [0.39, 0.85, 0.82]);   // #62d9d1 = primary.300
    sc.set('u_colB', [0.91, 0.38, 0.55]);   // #e8618c
    sc.set('u_base', [0.043, 0.047, 0.10]); // #0b0c1a = surface.950
    sc.set('u_rect', [-9999, -9999, 1, 1]);
    sc.set('u_hover', 0);
    sc.set('u_pulse', 0);
    sc.set('u_mouse', [-9999, -9999]);
    sc.beforeDraw = () => this.trackHovered();
  }

  unregister() { this.sc = undefined; this.enabled.set(false); }

  pointer(x: number, y: number) {
    if (!this.sc) return;
    const k = this.sc.pixelRatio;
    this.sc.set('u_mouse', [x * k, (innerHeight - y) * k]);
  }

  hover(el: HTMLElement | null) {
    if (!this.sc) return;
    this.zone.runOutsideAngular(() => {
      if (el) { this.hovered = el; this.sc!.tween('u_hover', 1, 380); }
      else this.sc!.tween('u_hover', 0, 450);
    });
  }

  pulse(from?: HTMLElement | null) {
    if (!this.sc) return;
    const k = this.sc.pixelRatio;
    const r = from?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : innerWidth / 2;
    const y = r ? r.top + r.height / 2 : innerHeight / 2;
    this.sc.set('u_pulseAt', [x * k, (innerHeight - y) * k]);
    this.sc.tween('u_pulse', 0, 1400, 1);
  }

  private trackHovered() {
    if (!this.sc || !this.hovered) return;
    const r = this.hovered.getBoundingClientRect();
    const k = this.sc.pixelRatio;
    this.sc.uniforms['u_rect'] = [r.left * k, (innerHeight - r.bottom) * k, r.width * k, r.height * k];
  }
}
