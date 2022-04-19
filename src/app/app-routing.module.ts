import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { IndexCustomerComponent } from './components/customers/index-customer/index-customer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    children: [
      {
        path: 'clientes',
        component: IndexCustomerComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
