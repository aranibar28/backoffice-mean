import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
})
export class UpdateCouponComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public coupon: any = {};
  public id: any;

  constructor(
    private couponService: CouponService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  updateForm: FormGroup = this.fb.group({
    code: [, [Validators.required, Validators.minLength(6)]],
    type: ['', [Validators.required]],
    value: [, [Validators.required]],
    limit: [, [Validators.required]],
  });

  init_data() {
    this.couponService.list_coupon_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data != undefined) {
          const { code, type, value, limit } = res.data;
          this.updateForm.patchValue({ code, type, value, limit });
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/cupones');
        }
      },
      error: (err) => console.log(err),
    });
  }

  update() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.couponService.update_coupon(this.id, this.updateForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/cupones');
        Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
      },
      error: (err) => {
        this.load_btn = false;
        Swal.fire('Ups!', err.error.msg, 'error');
      },
    });
  }

  validate(name: string, status: boolean) {
    const input = this.updateForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
