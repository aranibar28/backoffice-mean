import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { ConfigsComponent } from './configs/configs.component';
import { IndexCouponComponent } from './coupons/index-coupon/index-coupon.component';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './coupons/update-coupon/update-coupon.component';
import { IndexDiscountComponent } from './discounts/index-discount/index-discount.component';
import { CreateDiscountComponent } from './discounts/create-discount/create-discount.component';
import { UpdateDiscountComponent } from './discounts/update-discount/update-discount.component';
import { IndexCustomerComponent } from './customers/index-customer/index-customer.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { IndexProductComponent } from './products/index-product/index-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { InventoryProductComponent } from './products/inventory-product/inventory-product.component';
import { VarietyProductComponent } from './products/variety-product/variety-product.component';
import { GaleryProductComponent } from './products/galery-product/galery-product.component';
import { IndexCategoryComponent } from './categories/index-category/index-category.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { IndexContactComponent } from './contacts/index-contact/index-contact.component';
import { ReviewsProductComponent } from './products/reviews-product/reviews-product.component';
import { IndexSaleComponent } from './sales/index-sale/index-sale.component';
import { DetailSaleComponent } from './sales/detail-sale/detail-sale.component';

const childRoutes: Routes = [
    { path: 'clientes',component: IndexCustomerComponent },
    { path: 'clientes/registro',component: CreateCustomerComponent },
    { path: 'clientes/:id',component: UpdateCustomerComponent },

    { path: 'cupones',component: IndexCouponComponent },
    { path: 'cupones/registro',component: CreateCouponComponent },
    { path: 'cupones/:id',component: UpdateCouponComponent },

    { path: 'descuentos',component: IndexDiscountComponent },
    { path: 'descuentos/registro',component: CreateDiscountComponent },
    { path: 'descuentos/:id',component: UpdateDiscountComponent },

    { path: 'ventas',component: IndexSaleComponent },
    { path: 'ventas/:id',component: DetailSaleComponent },

    { path: 'categorias',component: IndexCategoryComponent },
    { path: 'categorias/registro',component: CreateCategoryComponent },
    { path: 'categorias/:id',component: UpdateCategoryComponent },

    { path: 'productos',component: IndexProductComponent },
    { path: 'productos/registro',component: CreateProductComponent },
    { path: 'productos/:id',component: UpdateProductComponent },
    
    { path: 'productos/inventario/:id',component: InventoryProductComponent },
    { path: 'productos/variedades/:id',component: VarietyProductComponent },
    { path: 'productos/galeria/:id',component: GaleryProductComponent },
    { path: 'productos/reviews/:id',component: ReviewsProductComponent },
    
    { path: 'inicio', component: InicioComponent },
    { path: 'contacto',component: IndexContactComponent },
    { path: 'configuracion',component: ConfigsComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }