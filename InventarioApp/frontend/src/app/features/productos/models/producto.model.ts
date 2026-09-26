export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string | null;
  cantidad: number;
  precio: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

/** Payload para crear / actualizar. */
export type ProductoRequest = Omit<Producto, 'id' | 'fechaCreacion' | 'fechaActualizacion'>;
