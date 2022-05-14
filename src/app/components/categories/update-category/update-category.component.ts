import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.url;
declare var $: any;

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  public category: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public imgCurrent: any;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  updateForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    icon: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  init_data() {
    this.categoryService.read_category_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.category = res.data;
          this.updateForm.patchValue(this.category);
          this.imgSelected = `${base_url}/get_banner_category/${this.category.banner}`;
          this.imgCurrent = this.category.banner;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/categorias');
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

    if (this.file) {
      const img = this.fb.control(this.file, Validators.required);
      this.updateForm.addControl('banner', img);
    }

    this.load_btn = true;
    this.categoryService
      .update_category_admin(this.updateForm.value, this.id)
      .subscribe({
        next: () => {
          Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/categorias');
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
      this.imgSelected = '/assets/img/01.jpg';
      $('#input-portada').text('Seleccionar imagen');
      $('#file-input').addClass('is-invalid');
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
    const input = this.updateForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
