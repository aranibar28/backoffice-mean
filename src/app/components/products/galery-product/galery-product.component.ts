import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast: any;
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
    this.url = environment.url;
    this.init_data();
  }

  init_data() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
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
          iziToast.error({
            title: 'Error!',
            message: 'El archivo debe ser una imagen',
          });
          this.file = undefined;
          $('#input-img').val('');
        }
      } else {
        iziToast.error({
          title: 'Error!',
          message: 'La imagen no puede superar los 4MB',
        });
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
      iziToast.error({
        title: 'Error!',
        message: 'Debe seleccionar una imagen.',
      });
    }
  }

  delete_data(id: any) {
    this.load_btn_image = true;
    this.productService.delete_product_galery(this.id, { _id: id }).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente la imágen.',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.load_btn_image = false;
        this.init_data();
      },
      error: (err) => console.log(err),
    });
  }
}
