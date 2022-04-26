import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-coupon',
  templateUrl: './index-coupon.component.html',
})
export class IndexCouponComponent implements OnInit {
  public coupons: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.list_coupons();
  }

  list_coupons() {
    this.couponService.list_coupons(this.word).subscribe({
      next: (res) => {
        this.coupons = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.list_coupons();
      return;
    }
    if (this.coupons.length === 0) {
      return;
    }
    this.list_coupons();
  }

  delete_data(id: any) {
    this.couponService.delete_coupon(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.list_coupons();
      },
      error: (err) => console.log(err),
    });
  }
}
