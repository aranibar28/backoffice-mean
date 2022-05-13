import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-discount',
  templateUrl: './index-discount.component.html',
})
export class IndexDiscountComponent implements OnInit {
  public discounts: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.discountService.read_discounts_admin(this.word).subscribe({
      next: (res) => {
        this.discounts = res.data;
        this.discounts.forEach((element) => {
          var start = Date.parse(element.start_date + 'T00:00:00') / 1000;
          var finish = Date.parse(element.finish_date + 'T00:00:00') / 1000;
          var today = Date.parse(new Date().toString()) / 1000;
          element.status = today > start ? 'Expirado' : 'Proximamente';
          if (today >= start && today <= finish) {
            element.status = 'En progreso';
          }
        });
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el código ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.discountService.delete_discount_admin(id).subscribe(() => {
          this.init_data();
          Swal.fire(
            'Listo!',
            `El descuento ${title} fue eliminado.`,
            'success'
          );
        });
      }
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.discounts.length === 0) {
      return;
    }
    this.init_data();
  }
}
