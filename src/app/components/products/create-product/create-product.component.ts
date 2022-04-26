import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  public product: any = { category: '' };
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public config: any = {};

  constructor(private productService: ProductService, private router: Router) {
    this.config = { height: 500 };
  }

  ngOnInit(): void {}

  register(registerForm: any) {
    if (registerForm.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'Error!',
          message: 'Debe subir una portada',
        });
      } else {
        this.load_btn = true;
        this.productService
          .register_product(this.product, this.file)
          .subscribe({
            next: () => {
              iziToast.success({
                title: 'OK',
                message: 'Se registro correctamente!',
              });
              this.load_btn = false;
              this.router.navigateByUrl('/dashboard/productos');
            },
            error: (err) => {
              console.log(err);
              this.load_btn = false;
            },
          });
      }
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
      this.load_btn = false;
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelected = '/assets/img/01.jpg';
      this.file = undefined;
    }
  }

  fileChanged(event: any): void {
    var file: File;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'No hay una imagen',
      });
    }
    if (file!.size <= 4000000) {
      if (
        file!.type === 'image/png' ||
        file!.type === 'image/jpg' ||
        file!.type === 'image/gif' ||
        file!.type === 'image/jpeg' ||
        file!.type === 'image/webp'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelected = reader.result);
        reader.readAsDataURL(file!);
        $('#input-portada').text(file!.name);
        this.file = file!;
      } else {
        iziToast.error({
          title: 'Error!',
          message: 'El archivo debe ser una imagen',
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelected = '/assets/img/01.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'La imagen no puede superar los 4MB',
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelected = '/assets/img/01.jpg';
      this.file = undefined;
    }
  }
}
