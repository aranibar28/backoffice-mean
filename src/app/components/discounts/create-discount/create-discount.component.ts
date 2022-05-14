import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/services/discount.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
})
export class CreateDiscountComponent implements OnInit {
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';

  constructor(
    private discountService: DiscountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    discount: [, [Validators.required, Validators.min(0), Validators.max(100)]],
    start_date: [, [Validators.required]],
    finish_date: [, [Validators.required]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      $('#file-input').addClass('is-invalid');
      return;
    }
    if (this.file) {
      this.load_btn = true;
      this.discountService
        .create_discount_admin(this.registerForm.value, this.file)
        .subscribe({
          next: () => {
            this.load_btn = false;
            this.router.navigateByUrl('/dashboard/descuentos');
            Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
          },
          error: (err) => {
            console.log(err);
            this.load_btn = false;
          },
        });
    } else {
      Swal.fire('Ups!', 'Es obligatorio subir un banner.', 'error');
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
    const input = this.registerForm.controls[name];
    return status ? input.errors && input.touched : input.valid;
  }
}
