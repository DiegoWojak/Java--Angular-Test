import { Producto } from '../models/producto.model';

export const STOCK_BAJO = 5;

export function hueDe(p: Producto): number {
  return Math.round((p.id * 137.508) % 360);
}

const ICONOS: [RegExp, string][] = [
  [/monitor|pantalla/i, 'pi-desktop'],
  [/laptop|notebook/i, 'pi-tablet'],
  [/teclado|keycap/i, 'pi-th-large'],
  [/aud[ií]fono|parlante|micr[oó]fono|sonido/i, 'pi-volume-up'],
  [/webcam|c[aá]mara/i, 'pi-camera'],
  [/impresora/i, 'pi-print'],
  [/router|wi-?fi|red/i, 'pi-wifi'],
  [/disco|ssd|memoria|ram/i, 'pi-server'],
  [/mouse|rat[oó]n/i, 'pi-arrow-up-left'],
  [/cable|hub|usb/i, 'pi-link']
];

export function iconoDe(p: Producto): string {
  return ICONOS.find(([re]) => re.test(p.nombre))?.[1] ?? 'pi-box';
}

export function stockLabel(p: Producto): string {
  return p.cantidad === 0 ? 'Agotado' : p.cantidad <= STOCK_BAJO ? `Quedan ${p.cantidad}` : 'En stock';
}

export function stockSeverity(p: Producto): 'danger' | 'warning' | 'success' {
  return p.cantidad === 0 ? 'danger' : p.cantidad <= STOCK_BAJO ? 'warning' : 'success';
}