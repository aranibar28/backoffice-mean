import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.url;
declare var $: any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public categories: any;
  public config: any = {};
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public imgCurrent: any;
  public id: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.config = { height: 500 };
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.categoryService.read_category_admin('').subscribe({
      next: ({ data }) => (this.categories = data),
    });
  }

  ngOnInit(): void {
    this.init_data();
  }

  updateForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    stock: [, [Validators.required]],
    price: [, [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required]],
    container: ['', [Validators.required]],
  });

  init_data() {
    this.productService.list_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data != undefined) {
          const {
            title,
            stock,
            price,
            category,
            description,
            container,
            banner,
          } = res.data;
          this.updateForm.patchValue({
            title,
            stock,
            price,
            category,
            description,
            container,
          });
          this.imgSelected = `${base_url}/get_banner/${banner}`;
          this.imgCurrent = banner;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
      error: (err) => console.log(err),
    });
  }

  update() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    if (this.file != undefined) {
      this.updateForm.addControl(
        'banner',
        this.fb.control(this.file, Validators.required)
      );
    }

    this.load_btn = true;
    this.productService
      .update_product(this.updateForm.value, this.id)
      .subscribe({
        next: () => {
          Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/productos');
        },
        error: (err) => {
          this.load_btn = false;
          console.log(err);
        },
      });
  }

  fileChanged(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.file = undefined;
      this.imgSelected = `${base_url}/get_banner/${this.imgCurrent}`;
      $('#input-portada').text('Seleccionar imagen');
    } else {
      if (file.size <= 4000000) {
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
          Swal.fire('Ups!', 'El archivo debe ser una imagen', 'error');
          this.file = undefined;
          this.imgSelected = '/assets/img/01.jpg';
          $('#input-portada').text('Seleccionar imagen');
          $('#file-input').addClass('is-invalid');
        }
      } else {
        Swal.fire('Ups!', 'La imagen no puede superar los 4MB', 'error');
        this.file = undefined;
        this.imgSelected = '/assets/img/01.jpg';
        $('#input-portada').text('Seleccionar imagen');
        $('#file-input').addClass('is-invalid');
      }
    }
  }

  validate(name: string, status: boolean) {
    const input = this.updateForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
