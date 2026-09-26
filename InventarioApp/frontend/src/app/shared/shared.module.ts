import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { ButtonModule } from 'primeng/button';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';

import { ToastModule } from 'primeng/toast';

import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { ShaderDirective } from './gl/shader.directive';
import { GlHoverDirective } from './gl/gl-hover.directive';

import { CardModule } from 'primeng/card';

const PRIMENG = [
  ButtonModule,
  ConfirmDialogModule,
  CardModule,
  DataViewModule,
  DropdownModule,
  IconFieldModule,
  InputIconModule,
  InputNumberModule,
  InputTextModule,
  InputTextareaModule,
  PasswordModule,
  SelectButtonModule,
  SidebarModule,
  SliderModule,
  TagModule,
  ToastModule,
  TooltipModule
];

const GL = [ShaderDirective, GlHoverDirective];

@NgModule({
  declarations: [
    FieldErrorComponent
  ],
  imports: [
    CommonModule,
    ...GL
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...PRIMENG, ...GL, FieldErrorComponent]
})
export class SharedModule { }
