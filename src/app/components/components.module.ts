import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsRoutingModule } from './components-routing.module';

// Modulos Contenedores
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ImagePipe } from '../pipes/image.pipe';

// Modulos Externos
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxTinymceModule } from 'ngx-tinymce';

// Components
import { InicioComponent } from './inicio/inicio.component';
import { ConfigsComponent } from './configs/configs.component';
import { IndexCustomerComponent } from './customers/index-customer/index-customer.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { IndexCouponComponent } from './coupons/index-coupon/index-coupon.component';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './coupons/update-coupon/update-coupon.component';
import { IndexProductComponent } from './products/index-product/index-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { InventoryProductComponent } from './products/inventory-product/inventory-product.component';
import { VarietyProductComponent } from './products/variety-product/variety-product.component';
import { GaleryProductComponent } from './products/galery-product/galery-product.component';
import { CreateDiscountComponent } from './discounts/create-discount/create-discount.component';
import { UpdateDiscountComponent } from './discounts/update-discount/update-discount.component';
import { IndexDiscountComponent } from './discounts/index-discount/index-discount.component';
import { DiscountPipe } from '../pipes/discount.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsRoutingModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.4/'
    }),
  ],
  declarations: [
    ImagePipe,
    DiscountPipe,
    PagesComponent,
    InicioComponent,
    ConfigsComponent,
    IndexCustomerComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    IndexProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    IndexCouponComponent,
    CreateCouponComponent,
    UpdateCouponComponent,
    InventoryProductComponent,
    VarietyProductComponent,
    GaleryProductComponent,
    CreateDiscountComponent,
    UpdateDiscountComponent,
    IndexDiscountComponent,
  ],
})
export class ComponentsModule {}
