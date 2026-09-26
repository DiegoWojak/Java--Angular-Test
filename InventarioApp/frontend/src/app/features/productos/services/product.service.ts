import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Producto, ProductoRequest } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseCrudService<Producto, ProductoRequest> {
  protected override endpoint: string = 'productos';

}
