import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PRIMENG = [
  ButtonModule,
  CardModule,
  ConfirmDialogModule,
  DialogModule,
  IconFieldModule,
  InputIconModule,
  InputNumberModule,
  InputTextModule,
  InputTextareaModule,
  PasswordModule,
  TableModule,
  ToastModule,
  ToolbarModule,
  TooltipModule
];

@NgModule({
  declarations: [
    FieldErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...PRIMENG, FieldErrorComponent]
})
export class SharedModule { }
