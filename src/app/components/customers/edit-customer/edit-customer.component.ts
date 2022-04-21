import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
declare var iziToast: any;

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
})
export class EditCustomerComponent implements OnInit {
  public loading: boolean = false;
  public load_data: boolean = true;
  public customer: any = {};
  public id: any;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.customerService.list_customer_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.customer = res.data;
            this.load_data = false;
          } else {
            this.router.navigateByUrl('/dashboard/clientes');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.loading = true;
      this.customerService
        .update_customer_admin(this.id, this.customer)
        .subscribe({
          next: () => {
            iziToast.success({
              title: 'OK',
              message: 'Se actualizó correctamente!',
            });
            this.loading = false;
            this.router.navigateByUrl('/dashboard/clientes');
          },
          error: (err) => {
            iziToast.error({
              title: 'Error!',
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
