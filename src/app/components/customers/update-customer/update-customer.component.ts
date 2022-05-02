import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
})
export class UpdateCustomerComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public customer: any = {};
  public id: any;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.init_data();
  }

  updateForm: FormGroup = this.fb.group({
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required, Validators.minLength(3)]],
    email: [, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: [, [Validators.required, Validators.pattern('[9][0-9]{8}')]],
    dni: [, [Validators.required, Validators.pattern('[0-9]{8}')]],
    gender: [, [Validators.required]],
    birthday: [, []],
  });

  init_data() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.customerService.list_customer_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.customer = res.data;
            const { first_name, last_name, email, phone, dni, gender, birthday } = this.customer;
            this.updateForm.patchValue({
              first_name,
              last_name,
              email,
              phone,
              dni,
              gender,
              birthday,
            })
            this.load_data = false;
          } else {
            this.router.navigateByUrl('/dashboard/clientes');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  update() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.customerService
      .update_customer_admin(this.id, this.updateForm.value)
      .subscribe({
        next: () => {
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/clientes');
          Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
        },
        error: (err) => {
          this.load_btn = false;
          Swal.fire('Ups!', err.error.msg, 'error');
        },
      });
  }

  fieldsInvalid(campo: string) {
    const text = this.updateForm.controls[campo];
    return text.errors && text.touched;
  }

  fieldsValid(campo: string) {
    const text = this.updateForm.controls[campo];
    return text.valid;
  }
}
