import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CoreModule } from './core/core.module';

import { ShaderDirective } from './shared/gl/shader.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    CoreModule, 
    ButtonModule, 
    ToastModule, 
    ConfirmDialogModule, 
    ShaderDirective,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
