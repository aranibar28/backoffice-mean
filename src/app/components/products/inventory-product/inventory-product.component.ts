import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
})
export class InventoryProductComponent implements OnInit {
  public product: any = {};
  public inventory: Array<any> = [];
  public id: any;
  public loading: boolean = false;
  public p: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list_inventory_product();
  }

  list_inventory_product() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.list_product_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.product = res.data;
            this.loading = false;
            this.productService
              .list_inventory_product(this.product._id)
              .subscribe({
                next: (res) => {
                  console.log(res);
                  this.inventory = res.data;
                },
                error: (err) => console.log(err),
              });
          } else {
            this.router.navigateByUrl('/dashboard/productos');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  eliminar(id: any) {
    this.productService.delete_inventory_product(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.productService.list_inventory_product(this.product._id).subscribe({
          next: (res) => {
            console.log(res);
            this.inventory = res.data;
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }
}
