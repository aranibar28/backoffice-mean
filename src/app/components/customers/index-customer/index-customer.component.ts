import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
})
export class IndexCustomerComponent implements OnInit {
  public customers: Array<any> = [];
  public filter_name: string = '';
  public filter_email: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list_customers();
  }

  list_customers() {
    this.customerService.list_customers(null, null).subscribe({
      next: (res) => {
        this.customers = res.data;
        console.log(this.customers);
      },
      error: (err) => console.log(err),
    });
  }

  filter(type: any) {
    var filter;
    type === 'last_name' && (filter = this.filter_name);
    type === 'email' && (filter = this.filter_email);
    this.customerService.list_customers(type, filter).subscribe({
      next: (res) => (this.customers = res.data),
      error: (err) => console.log(err),
    });
  }
}
