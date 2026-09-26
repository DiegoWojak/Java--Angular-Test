import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, inject, input } from '@angular/core';
import { ShaderCanvas } from './shader-canvas';
import { FxService } from './fx.service';

@Directive({ selector: 'canvas[appShader]', standalone: true })
export class ShaderDirective implements AfterViewInit, OnDestroy {
  readonly frag = input.required<string>({ alias: 'appShader' });
  private el = inject<ElementRef<HTMLCanvasElement>>(ElementRef);
  private zone = inject(NgZone);
  private fx = inject(FxService);
  private sc?: ShaderCanvas;
  private ro?: ResizeObserver;
  private onMove = (e: PointerEvent) => this.fx.pointer(e.clientX, e.clientY);
  private onVis = () => document.hidden ? this.sc?.stop() : (this.sc && !this.sc.running && this.sc.start());

  ngAfterViewInit() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => {
      try {
        this.sc = new ShaderCanvas(this.el.nativeElement, this.frag());
      } catch {
        return; // sin WebGL2: queda el gradiente CSS de fallback
      }
      this.sc.resize();
      this.ro = new ResizeObserver(() => this.sc?.resize());
      this.ro.observe(this.el.nativeElement);
      this.fx.register(this.sc);
      addEventListener('pointermove', this.onMove, { passive: true });
      document.addEventListener('visibilitychange', this.onVis);
      this.sc.start();
    });
  }

  ngOnDestroy() {
    removeEventListener('pointermove', this.onMove);
    document.removeEventListener('visibilitychange', this.onVis);
    this.ro?.disconnect();
    this.fx.unregister();
    this.sc?.dispose();
  }
}
