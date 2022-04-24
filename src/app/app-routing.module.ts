import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { IndexCustomerComponent } from './components/customers/index-customer/index-customer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    children: [
      { path: 'clientes',component: IndexCustomerComponent,canActivate: [AuthGuard] },
      { path: 'clientes/registro',component: CreateCustomerComponent, canActivate: [AuthGuard] },
      { path: 'cliente/:id',component: EditCustomerComponent, canActivate: [AuthGuard] },

      { path: 'productos',component: IndexProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/registro',component: CreateProductComponent, canActivate: [AuthGuard] },
      { path: 'producto/:id',component: UpdateProductComponent, canActivate: [AuthGuard] },
      { path: 'producto/inventario/:id',component: InventoryProductComponent, canActivate: [AuthGuard] },

      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
