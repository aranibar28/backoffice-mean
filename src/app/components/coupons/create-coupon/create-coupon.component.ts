import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';
import { Router } from '@angular/router';
declare var iziToast: any;

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
})
export class CreateCouponComponent implements OnInit {
  public coupon: any = { type: '' };
  public load_btn: boolean = false;

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      this.load_btn = true;
      this.couponService.register_coupon(this.coupon).subscribe({
        next: () => {
          iziToast.success({
            title: 'OK',
            message: 'Se registro correctamente!',
          });
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/cupones');
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
}
