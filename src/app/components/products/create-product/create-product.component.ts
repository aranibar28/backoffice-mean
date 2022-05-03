import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  public product: any = { category: '' };
  public categories: any;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public config: any = {};

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.config = { height: 500 };
    this.authService
      .get_config_public()
      .subscribe(({ data: { categories } }) => (this.categories = categories));
  }

  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    stock: ['', [Validators.required]],
    price: [, [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required]],
    container: ['', [Validators.required]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      $('#file-input').addClass('is-invalid');
      return;
    }
    if (this.file == undefined) {
      Swal.fire('Ups!', 'Es obligatorio subir una foto del producto.', 'error');
    } else {
      this.load_btn = true;
      this.productService
        .register_product(this.registerForm.value, this.file)
        .subscribe({
          next: () => {
            this.load_btn = false;
            this.router.navigateByUrl('/dashboard/productos');
            Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
          },
          error: (err) => {
            console.log(err);
            this.load_btn = false;
          },
        });
    }
  }

  fileChanged(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.file = undefined;
      this.imgSelected = '/assets/img/01.jpg';
      $('#input-portada').text('Seleccionar imagen');
      $('#file-input').addClass('is-invalid');
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
          reader.onload = () => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);
          $('#input-portada').text(file.name);
          $('#file-input').removeClass('is-invalid');
          this.file = file;
        } else {
          this.file = undefined;
          this.imgSelected = '/assets/img/01.jpg';
          $('#input-portada').text('Seleccionar imagen');
          $('#file-input').addClass('is-invalid');
          Swal.fire('Ups!', 'El archivo debe ser una imagen', 'error');
        }
      } else {
        this.file = undefined;
        this.imgSelected = '/assets/img/01.jpg';
        $('#input-portada').text('Seleccionar imagen');
        $('#file-input').addClass('is-invalid');
        Swal.fire('Ups!', 'La imagen no puede superar los 4MB', 'error');
      }
    }
  }

  validate(name: string, status: boolean) {
    const input = this.registerForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
