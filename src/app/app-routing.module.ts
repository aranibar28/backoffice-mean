import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateCouponComponent } from './components/coupons/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './components/coupons/index-coupon/index-coupon.component';
import { UpdateCouponComponent } from './components/coupons/update-coupon/update-coupon.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';
import { IndexCustomerComponent } from './components/customers/index-customer/index-customer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfigsComponent } from './components/configs/configs.component';
import { VarietyProductComponent } from './components/products/variety-product/variety-product.component';
import { GaleryProductComponent } from './components/products/galery-product/galery-product.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    children: [
      { path: 'clientes',component: IndexCustomerComponent,canActivate: [AuthGuard] },
      { path: 'clientes/registro',component: CreateCustomerComponent, canActivate: [AuthGuard] },
      { path: 'clientes/:id',component: UpdateCustomerComponent, canActivate: [AuthGuard] },

      { path: 'productos',component: IndexProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/registro',component: CreateProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/:id',component: UpdateProductComponent, canActivate: [AuthGuard] },
      
      { path: 'productos/inventario/:id',component: InventoryProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/variedades/:id',component: VarietyProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/galeria/:id',component: GaleryProductComponent, canActivate: [AuthGuard] },

      { path: 'cupones',component: IndexCouponComponent, canActivate: [AuthGuard] },
      { path: 'cupones/registro',component: CreateCouponComponent, canActivate: [AuthGuard] },
      { path: 'cupones/:id',component: UpdateCouponComponent, canActivate: [AuthGuard] },

      { path: 'configuracion',component: ConfigsComponent, canActivate: [AuthGuard] },
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
