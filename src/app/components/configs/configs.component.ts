import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

const base_url = environment.url;
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
})
export class ConfigsComponent implements OnInit {
  public config: any = {};
  public name: string = '';
  public icon: string = '';
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.jpg';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.authService.get_config_admin().subscribe({
      next: (res: any) => {
        this.config = res.data;
        this.imgSelected = `${base_url}/get_logo/${this.config.logo}`;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  add_category() {
    if (this.name && this.icon) {
      this.config.categories.push({
        name: this.name,
        icon: this.icon,
        _id: uuidv4(),
      });
      this.name = '';
      this.icon = '';
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Debe ingresar nombre e icono para una nueva la categoría',
      });
    }
  }

  update_category(registerForm: any) {
    if (registerForm.valid) {
      let data = {
        title: registerForm.value.title,
        serie: registerForm.value.serie,
        correlative: registerForm.value.correlative,
        categories: this.config.categories,
        logo: this.file,
      };
      this.authService
        .update_config_admin('6267febf2c5d09955768666a', data)
        .subscribe({
          next: (res) => {
            iziToast.success({
              title: 'OK',
              message: 'Se actualizó correctamente!',
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Complete correctamente el formulario',
      });
    }
  }

  delete_category(id: any) {
    this.config.categories.splice(id, 1);
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
        file!.type === 'image/svg' ||
        file!.type === 'image/png' ||
        file!.type === 'image/jpg' ||
        file!.type === 'image/gif' ||
        file!.type === 'image/jpeg' ||
        file!.type === 'image/webp'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelected = reader.result);
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file!);
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

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html('<img src=' + this.imgSelected + '>');
  }
}
