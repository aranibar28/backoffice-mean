import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews-product',
  templateUrl: './reviews-product.component.html',
  styles: [],
})
export class ReviewsProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;

  public reviews: Array<any> = [];
  public product: any = {};
  public id: any;
  public p = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.productService.list_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data != undefined) {
          this.product = res.data;
          this.productService.list_reviews_public(this.product._id).subscribe({
            next: (res) => {
              this.reviews = res.data;
            },
          });
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
    });
  }
}
