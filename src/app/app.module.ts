import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexCustomerComponent } from './components/customers/index-customer/index-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductComponent } from './components/products/index-product/index-product.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexCustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    CreateProductComponent,
    IndexProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
