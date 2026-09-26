import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const MENSAJES: Record<string, (e: any) => string> = {
  required: () => 'Campo obligatorio',
  maxlength: e => `Máximo ${e.requiredLength} caracteres`,
  min: e => `Debe ser mayor o igual a ${e.min}`,
  max: e => `Debe ser menor o igual a ${e.max}`,
  pattern: () => 'Formato inválido',
  whitespace: () => 'No puede contener solo espacios',
  server: e => e
};

@Component({
  selector: 'app-field-error',
  templateUrl: `@if (mensaje) { <small class="p-error block mt-1">{{ mensaje }}</small> }`,
})
export class FieldErrorComponent {
  @Input({ required: true }) control!: AbstractControl;

  get mensaje(): string | null {
    const c = this.control;
    if (!c?.errors || !(c.touched || c.dirty)) {
      return null;
    }
    const [key, value] = Object.entries(c.errors)[0];
    return MENSAJES[key]?.(value) ?? 'Valor inválido';
  }
}
