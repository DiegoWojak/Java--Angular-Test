import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { FxService } from './fx.service';

/**
 * Hover "dinámico" sin un contexto WebGL por card:
 * - tilt 3D con CSS (barato)
 * - glow dibujado por el shader de fondo alrededor del rect de la card
 */
@Directive({ selector: '[glHover]', standalone: true, host: { class: 'gl-hover' } })
export class GlHoverDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private fx = inject(FxService);
  private reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('pointerenter')
  enter() { this.fx.hover(this.el.nativeElement); }

  @HostListener('pointermove', ['$event'])
  move(e: PointerEvent) {
    if (this.reduce || e.pointerType !== 'mouse') return;
    const el = this.el.nativeElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  @HostListener('pointerleave')
  leave() {
    this.fx.hover(null);
    const s = this.el.nativeElement.style;
    s.setProperty('--rx', '0deg');
    s.setProperty('--ry', '0deg');
  }
}
