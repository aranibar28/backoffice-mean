import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { ConfigsComponent } from './configs/configs.component';
import { IndexCouponComponent } from './coupons/index-coupon/index-coupon.component';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './coupons/update-coupon/update-coupon.component';
import { IndexCustomerComponent } from './customers/index-customer/index-customer.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { IndexProductComponent } from './products/index-product/index-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { InventoryProductComponent } from './products/inventory-product/inventory-product.component';
import { VarietyProductComponent } from './products/variety-product/variety-product.component';
import { GaleryProductComponent } from './products/galery-product/galery-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'clientes',component: IndexCustomerComponent,canActivate: [AuthGuard] },
      { path: 'clientes/registro',component: CreateCustomerComponent, canActivate: [AuthGuard] },
      { path: 'clientes/:id',component: UpdateCustomerComponent, canActivate: [AuthGuard] },

      { path: 'cupones',component: IndexCouponComponent, canActivate: [AuthGuard] },
      { path: 'cupones/registro',component: CreateCouponComponent, canActivate: [AuthGuard] },
      { path: 'cupones/:id',component: UpdateCouponComponent, canActivate: [AuthGuard] },

      { path: 'productos',component: IndexProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/registro',component: CreateProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/:id',component: UpdateProductComponent, canActivate: [AuthGuard] },
      
      { path: 'productos/inventario/:id',component: InventoryProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/variedades/:id',component: VarietyProductComponent, canActivate: [AuthGuard] },
      { path: 'productos/galeria/:id',component: GaleryProductComponent, canActivate: [AuthGuard] },
      
      { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
      { path: 'configuracion',component: ConfigsComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ComponentsRoutingModule {}
