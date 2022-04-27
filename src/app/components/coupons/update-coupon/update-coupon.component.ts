import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';

declare var iziToast: any;

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.couponService.list_coupon_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.coupon = res.data;
            this.load_data = false;
          } else {
            this.router.navigateByUrl('/dashboard/cupones');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.load_btn = true;
      this.couponService.update_coupon(this.id, this.coupon).subscribe({
        next: () => {
          iziToast.success({
            title: 'OK',
            message: 'Se actualizó correctamente!',
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
