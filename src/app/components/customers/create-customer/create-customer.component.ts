import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
declare var iziToast: any;

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit {
  public loading: boolean = false;
  public customer: any = {
    gender: '',
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      this.loading = true;
      this.customerService.register_customer_admin(this.customer).subscribe({
        next: () => {
          iziToast.success({
            title: 'OK',
            message: 'Se registro correctamente!',
          });
          this.loading = false;
          this.router.navigateByUrl('/dashboard/clientes');
        },
        error: (err) => console.log(err),
      });
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }
}
