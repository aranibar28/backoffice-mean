import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
})
export class IndexCustomerComponent implements OnInit {
  public customers: Array<any> = [];
  public filter_name: string = '';
  public filter_email: string = '';
  public p: number = 1;
  public loading: boolean = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list_customers();
  }

  list_customers() {
    this.customerService.list_customers(null, null).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.loading = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter(type: any) {
    var filter;
    type === 'last_name' && (filter = this.filter_name);
    type === 'email' && (filter = this.filter_email);
    this.loading = true;
    this.customerService.list_customers(type, filter).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.loading = false;
      },
      error: (err) => console.log(err),
    });
  }

  eliminar(id: any) {
    this.customerService.delete_customer_admin(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.list_customers();
      },
      error: (err) => console.log(err),
    });
  }
}
