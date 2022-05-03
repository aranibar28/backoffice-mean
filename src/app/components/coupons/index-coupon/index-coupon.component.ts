import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';
import Swal from 'sweetalert2';

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
    this.init_data();
  }

  init_data() {
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
      this.init_data();
      return;
    }
    if (this.coupons.length === 0) {
      return;
    }
    this.init_data();
  }

  delete_data(id: any, code: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el código ${code}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponService.delete_coupon(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `El código ${code} fue eliminado.`, 'success');
        });
      }
    });
  }
}
