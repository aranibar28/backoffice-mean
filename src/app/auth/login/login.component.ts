import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public usuario: any = {};
  public token: any = '';

  constructor(private authService: AuthService, private router: Router) {
    this.token = this.authService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this.router.navigateByUrl('/');
    } else {
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      };

      this.authService.login_admin(data).subscribe({
        next: (res) => {
          this.usuario = res.data;
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.data._id);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          iziToast.show({
            title: 'Error!',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: err.error.msg,
          });
        },
      });
    } else {
      iziToast.show({
        title: 'Error!',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }
}
