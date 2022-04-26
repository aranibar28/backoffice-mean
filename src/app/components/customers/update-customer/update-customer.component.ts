import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
declare var iziToast: any;

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
})
export class UpdateCustomerComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public customer: any = {};
  public id: any;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
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
      this.load_btn = true;
      this.customerService
        .update_customer_admin(this.id, this.customer)
        .subscribe({
          next: () => {
            iziToast.success({
              title: 'OK',
              message: 'Se actualizó correctamente!',
            });
            this.load_btn = false;
            this.router.navigateByUrl('/dashboard/clientes');
          },
          error: (err) => {
            this.load_btn = false;
            console.log(err);
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
