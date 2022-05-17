import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
})
export class IndexSaleComponent implements OnInit {
  public sales: Array<any> = [];
  public from: any;
  public to: any;
  public p = 1;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.authService.get_sales_admin(this.from, this.to).subscribe({
      next: (res) => {
        this.sales = res.data;
      },
    });
  }

  filter() {
    this.authService.get_sales_admin(this.from, this.to).subscribe({
      next: (res) => {
        this.sales = res.data;
      },
    });
  }
}
