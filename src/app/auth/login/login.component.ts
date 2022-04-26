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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
        error: () => {
          iziToast.error({
            title: 'Error!',
            message: 'Los datos del formulario no son válidos',
          });
        },
      });
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }
}
