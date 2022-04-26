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
  public filter_firt_name: string = '';
  public filter_last_name: string = '';
  public filter_email: string = '';
  public load_data: boolean = true;
  public p: number = 1;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list_customers();
  }

  list_customers() {
    this.customerService.list_customers(null, null).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter(type: any) {
    var filter;
    type === 'first_name' && (filter = this.filter_firt_name);
    type === 'last_name' && (filter = this.filter_last_name);
    type === 'email' && (filter = this.filter_email);

    this.customerService.list_customers(type, filter).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any) {
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
