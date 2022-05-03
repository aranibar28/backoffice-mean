import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-variety-product',
  templateUrl: './variety-product.component.html',
})
export class VarietyProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public product: any = {};
  public new_variety: string = '';
  public url: string = '';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  init_data() {
    this.productService.list_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data != undefined) {
          this.product = res.data;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
      error: (err) => console.log(err),
    });
  }

  add_variety() {
    if (this.new_variety) {
      this.product.item_variety.push({
        name: this.new_variety,
      });
      this.new_variety = '';
    } else {
      Swal.fire('Ups!', 'El campo de la variedad es obligatorio.', 'error');
    }
  }

  delete_variety(id: any) {
    this.product.item_variety.splice(id, 1);
  }

  update() {
    if (this.product.name_variety) {
      if (this.product.item_variety.length > 0) {
        this.load_btn = true;
        this.productService
          .update_product_variety(
            {
              name_variety: this.product.name_variety,
              item_variety: this.product.item_variety,
            },
            this.id
          )
          .subscribe({
            next: () => {
              this.load_btn = false;
              Swal.fire('Muy Bien!', 'Datos guardados', 'success');
            },
            error: (err) => console.log(err),
          });
      } else {
        Swal.fire('Ups!', 'Se debe agregar como mínimo un item.', 'error');
      }
    } else {
      Swal.fire('Ups!', 'Se debe ingresar el nombre de una variedad.', 'error');
    }
  }
}
