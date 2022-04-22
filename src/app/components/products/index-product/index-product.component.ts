import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

const base_url = environment.url;
declare var iziToast: any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
})
export class IndexProductComponent implements OnInit {
  public products: Array<any> = [];
  public word: string = '';
  public loading: boolean = true;
  public p: number = 1;
  public url;

  constructor(private productService: ProductService) {
    this.url = base_url;
  }

  ngOnInit(): void {
    this.list_products();
  }

  list_products() {
    this.productService.list_products(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.list_products();
      return;
    }
    this.loading = true;
    this.productService.list_products(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: (err) => console.log(err),
    });
  }

  eliminar(id: any) {}
}
