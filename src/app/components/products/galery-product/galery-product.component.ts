import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-galery-product',
  templateUrl: './galery-product.component.html',
})
export class GaleryProductComponent implements OnInit {
  public load_btn_image: boolean = false;
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public product: any = {};
  public file: File | undefined;
  public url: string = '';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
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
    });
  }

  ngOnInit(): void {}

  fileChanged(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      this.file = undefined;
    } else {
      if (file.size <= 3000000) {
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpg' ||
          file.type === 'image/gif' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/webp'
        ) {
          this.file = file;
        } else {
          Swal.fire('Ups!', 'El archivo debe ser una imagen.', 'error');
          this.file = undefined;
          $('#input-img').val('');
        }
      } else {
        Swal.fire('Ups!', 'La imagen no puede superar los 4MB.', 'error');
        this.file = undefined;
        $('#input-img').val('');
      }
    }
  }

  add_image() {
    if (this.file !== undefined) {
      let data = {
        image: this.file,
        _id: uuidv4(),
      };
      this.productService.update_product_galery(this.id, data).subscribe({
        next: () => {
          this.init_data();
          $('#input-img').val('');
        },
        error: (err) => console.log(err),
      });
    } else {
      Swal.fire('Ups!', 'Debe seleccionar una imagen.', 'error');
    }
  }

  delete_image(id: any) {
    Swal.fire({
      title: 'Eliminar Producto',
      text: `¿Desea eliminar esta imagen?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_btn_image = true;
        this.productService
          .delete_product_galery(this.id, { _id: id })
          .subscribe(() => {
            this.load_btn_image = false;
            this.init_data();
            Swal.fire('Ok!', 'Imagen eliminada.', 'success');
          });
      }
    });
  }
}
