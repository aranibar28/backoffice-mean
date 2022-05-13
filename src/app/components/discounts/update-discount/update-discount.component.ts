import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.url;
declare var $: any;

@Component({
  selector: 'app-update-discount',
  templateUrl: './update-discount.component.html',
  styles: [],
})
export class UpdateDiscountComponent implements OnInit {
  public discount: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';
  public imgCurrent: any;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private discountService: DiscountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  updateForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    discount: [, [Validators.required, Validators.min(0), Validators.max(100)]],
    start_date: [, [Validators.required]],
    finish_date: [, [Validators.required]],
  });

  init_data() {
    this.discountService.read_discount_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.discount = res.data;
          this.updateForm.patchValue(this.discount);
          this.imgSelected = `${base_url}/get_banner_discount/${this.discount.banner}`;
          this.imgCurrent = this.discount.banner;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/descuentos');
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
    this.discountService
      .update_discount_admin(this.updateForm.value, this.id)
      .subscribe({
        next: () => {
          Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
          this.load_btn = false;
          this.router.navigateByUrl('/dashboard/descuentos');
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
