import { Producto, ProductoRequest } from '../app/features/productos/models/producto.model';

/** Datos mock compartidos por los tests. */
export const PRODUCTOS_MOCK: Producto[] = [
  { id: 1, nombre: 'Laptop Lenovo ThinkPad', descripcion: 'Core i5, 16GB RAM', cantidad: 15, precio: 3899.9 },
  { id: 2, nombre: 'Mouse Logitech M185', descripcion: 'Inalámbrico USB', cantidad: 120, precio: 49.9 },
  { id: 3, nombre: 'Monitor LG 27"', descripcion: null, cantidad: 30, precio: 799 }
];

export const PRODUCTO_REQUEST_MOCK: ProductoRequest = {
  nombre: 'Teclado Redragon',
  descripcion: 'Switches blue',
  cantidad: 45,
  precio: 189
};
