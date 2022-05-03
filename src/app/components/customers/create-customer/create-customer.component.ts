import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit {
  public load_btn: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required, Validators.minLength(3)]],
    email: [, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: [, [Validators.required, Validators.pattern('[9][0-9]{8}')]],
    dni: [, [Validators.required, Validators.pattern('[0-9]{8}')]],
    gender: ['', [Validators.required]],
    birthday: [, []],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.customerService
      .register_customer_admin(this.registerForm.value)
      .subscribe({
        next: () => {
          Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/clientes');
        },
        error: (err) => {
          this.load_btn = false;
          Swal.fire('Ups!', err.error.msg, 'error');
        },
      });
  }

  validate(name: string, status: boolean) {
    const input = this.registerForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
