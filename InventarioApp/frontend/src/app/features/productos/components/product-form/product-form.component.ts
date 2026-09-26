import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Producto, ProductoRequest } from '../../models/producto.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

import { noWhitespace } from '../../../../shared/validators/no-whitespace.validator';
import { ApiError } from '../../../../core/models/api-error.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges{
  @Input() producto: Producto | null = null;
  @Output() guardado = new EventEmitter<Producto>();
  @Output() cancelado = new EventEmitter<void>();

  saving = false;

  private readonly fb = inject(FormBuilder);
  

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, noWhitespace, Validators.maxLength(100)]],
    descripcion: ['', [Validators.maxLength(255)]],
    cantidad: [null as number | null, [Validators.required, Validators.min(0), Validators.max(1_000_000)]],
    precio: [null as number | null, [Validators.required, Validators.min(0), Validators.max(99_999_999.99)]]
  });

  constructor(
    private service: ProductService,
    private messages: MessageService
  ) {}

  get esEdicion(): boolean {
    return !!this.producto;
  }

  ngOnChanges(): void {
    this.form.reset({
      nombre: this.producto?.nombre ?? '',
      descripcion: this.producto?.descripcion ?? '',
      cantidad: this.producto?.cantidad ?? null,
      precio: this.producto?.precio ?? null
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body: ProductoRequest = {
      nombre: v.nombre!.trim(),
      descripcion: v.descripcion?.trim() || null,
      cantidad: v.cantidad!,
      precio: v.precio!
    };
    const request$ = this.producto ? this.service.update(this.producto.id, body) : this.service.create(body);

    this.saving = true;
    request$.subscribe({
      next: saved => {
        this.saving = false;
        this.messages.add({
          severity: 'success',
          summary: this.esEdicion ? 'Producto actualizado' : 'Producto creado',
          detail: saved.nombre
        });
        this.guardado.emit(saved);
      },
      error: (err: HttpErrorResponse) => {
        this.saving = false;
        this.aplicarErroresServidor(err.error as ApiError);
      }
    });
  }

  private aplicarErroresServidor(apiError: ApiError | null): void {
    apiError?.errores?.forEach(({ campo, mensaje }) => {
      const control = this.form.get(campo);
      control?.setErrors({ server: mensaje });
      control?.markAsTouched();
    });
  }
}
