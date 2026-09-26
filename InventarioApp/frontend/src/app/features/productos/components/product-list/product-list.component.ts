import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';

import { Producto } from '../../models/producto.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  productos: Producto[] = [];
  loading = false;

  readonly busqueda = new FormControl('', { nonNullable: true });

  dialogVisible = false;
  productoSeleccionado: Producto | null = null;

  constructor(
    private service: ProductService,
    private confirmation: ConfirmationService,
    private messages: MessageService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.busqueda.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap(nombre =>
          this.service.list({ nombre }).pipe(
            catchError(() => EMPTY),
            finalize(() => (this.loading = false))
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: productos => (this.productos = productos)
     });
     this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.service
      .list({ nombre: this.busqueda.value })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(productos => (this.productos = productos));
  }

  nuevo(): void {
    this.productoSeleccionado = null;
    this.dialogVisible = true;
  }

  editar(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.dialogVisible = true;
  }

  onGuardado(): void {
    this.dialogVisible = false;
    this.cargar();
  }

  confirmarEliminar(producto: Producto): void {
    this.confirmation.confirm({
      header: 'Eliminar producto',
      message: `¿Seguro que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () =>
        this.service.delete(producto.id).subscribe(() => {
          this.messages.add({ severity: 'success', summary: 'Producto eliminado', detail: producto.nombre });
          this.cargar();
        })
    });
  }
}
