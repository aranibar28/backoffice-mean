import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
})
export class IndexCustomerComponent implements OnInit {
  public customers: Array<any> = [];
  public filter_name: string = '';
  public filter_email: string = '';
  p: number = 1;
  public token: any;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
  }

  ngOnInit(): void {
    this.list_customers();
  }

  list_customers() {
    this.customerService.list_customers(null, null, this.token).subscribe({
      next: (res) => (this.customers = res.data),
      error: (err) => console.log(err),
    });
  }

  filter(type: any) {
    var filter;
    type === 'last_name' && (filter = this.filter_name);
    type === 'email' && (filter = this.filter_email);
    
    this.customerService.list_customers(type, filter, this.token).subscribe({
      next: (res) => (this.customers = res.data),
      error: (err) => console.log(err),
    });
  }
}
