import { NgModule } from '@angular/core';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductListComponent}])
  ]
})
export class ProductosModule { }
