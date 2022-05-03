import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
})
export class CreateCouponComponent implements OnInit {
  public load_btn: boolean = false;

  constructor(
    private couponService: CouponService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    code: [, [Validators.required, Validators.minLength(5)]],
    type: ['', [Validators.required]],
    value: [, [Validators.required]],
    limit: [, [Validators.required]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.couponService.register_coupon(this.registerForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/cupones');
        Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
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
