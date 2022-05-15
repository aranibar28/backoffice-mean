import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-contact',
  templateUrl: './index-contact.component.html',
})
export class IndexContactComponent implements OnInit {
  public messages: Array<any> = [];
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public word: string = '';
  public p: number = 1;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.authService.get_messages_admin().subscribe({
      next: (res) => {
        this.load_data = false;
        this.messages = res.data;
      },
    });
  }

  close_asunt(id: any) {
    Swal.fire({
      title: 'Cerrar Mensaje ' + id,
      text: 'Desea cerrar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_btn = true;
        this.authService
          .close_message_admin(id, { data: undefined })
          .subscribe({
            next: () => {
              this.init_data();
              this.load_btn = false;
              Swal.fire('Listo!', 'El mensaje a sido cerrado.', 'success');
            },
          });
      }
    });
  }
}
