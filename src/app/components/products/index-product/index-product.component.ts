import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
})
export class IndexProductComponent implements OnInit {
  public products: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public url: string = '';
  public p: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.list_products();
    this.url = environment.url;
  }

  list_products() {
    this.productService.list_products(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.list_products();
      return;
    }
    if (this.products.length === 0) {
      return;
    }
    this.list_products();
  }

  delete_data(id: any) {
    this.productService.delete_product(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.list_products();
      },
      error: (err) => console.log(err),
    });
  }
}
