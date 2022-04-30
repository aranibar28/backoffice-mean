import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

const base_url = environment.url;
declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public product: any = {};
  public categories: any;
  public config: any = {};
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public id: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.config = { height: 500 };
    this.authService.get_config_public().subscribe({
      next: (res) => {
        this.categories = res.data.categories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.list_product_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.product = res.data;
            this.imgSelected = `${base_url}/get_banner/${this.product.banner}`;
            this.load_data = false;
          } else {
            this.router.navigateByUrl('/dashboard/productos');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      var data: any = {};
      if (this.file != undefined) {
        data.banner = this.file;
      }

      data.title = this.product.title;
      data.stock = this.product.stock;
      data.price = this.product.price;
      data.category = this.product.category;
      data.description = this.product.description;
      data.container = this.product.container;

      this.load_btn = true;
      this.productService.update_product(data, this.id).subscribe({
        next: () => {
          iziToast.success({
            title: 'OK',
            message: 'Se actualizó correctamente!',
          });
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/productos');
        },
        error: (err) => {
          this.load_btn = false;
          console.log(err);
        },
      });
    } else {
      this.load_btn = false;
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }

  fileChanged(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      this.file = undefined;
      this.imgSelected = `${base_url}/get_banner/${this.product.banner}`;
      $('#input-portada').text('Seleccionar imagen');
    } else {
      if (file.size <= 3000000) {
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpg' ||
          file.type === 'image/gif' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/webp'
        ) {
          const reader = new FileReader();
          reader.onload = (e) => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);
          $('#input-portada').text(file.name);
          this.file = file;
        } else {
          iziToast.error({
            title: 'Error!',
            message: 'El archivo debe ser una imagen',
          });
          this.file = undefined;
          this.imgSelected = '/assets/img/01.jpg';
          $('#input-portada').text('Seleccionar imagen');
        }
      } else {
        iziToast.error({
          title: 'Error!',
          message: 'La imagen no puede superar los 4MB',
        });
        this.file = undefined;
        this.imgSelected = '/assets/img/01.jpg';
        $('#input-portada').text('Seleccionar imagen');
      }
    }
  }
}
