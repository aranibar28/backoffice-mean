import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var iziToast: any;

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  public customer: any = { gender: '' };
  public load_btn: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      this.load_btn = true;
      this.customerService.register_customer_admin(this.customer).subscribe({
        next: () => {
          iziToast.success({
            title: 'OK',
            message: 'Se registro correctamente!',
          });
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/clientes');
        },
        error: (err) => {
          this.load_btn = false;
          console.log(err);
        },
      });
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }

  emailValid(): boolean {
    return (
      this.registerForm?.controls['email']?.invalid &&
      this.registerForm?.controls['email']?.touched
    );
  }
}
