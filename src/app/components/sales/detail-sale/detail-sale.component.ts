import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html',
})
export class DetailSaleComponent implements OnInit {
  public id: any;
  public order: any = {};
  public details: Array<any> = [];
  public load_data = true;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  init_data() {
    this.authService.read_orders_by_id(this.id).subscribe({
      next: (res) => {
        if (res) {
          this.order = res.data;
          this.details = res.details;
          this.load_data = false;
          console.log(this.details);
        } else {
          this.router.navigateByUrl('/cuenta/ordenes');
        }
      },
    });
  }
}
