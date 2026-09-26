import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'productos',
    canActivate: [authGuard],
    loadChildren: () => import('./features/productos/productos.module').then(m => m.ProductosModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
