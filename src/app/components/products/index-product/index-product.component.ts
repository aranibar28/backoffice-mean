import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
})
export class IndexProductComponent implements OnInit {
  public products: Array<any> = [];
  public export_products: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public url: string = '';
  public p: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.list_products();
    this.url = environment.url;
  }

  list_products() {
    this.productService.list_products(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.products.forEach((element) => {
          this.export_products.push({
            title: element.title,
            stock: element.stock,
            price: element.price,
            category: element.category,
            num_sales: element.num_sales,
            create_at: element.create_at,
          });
        });
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.list_products();
      return;
    }
    if (this.products.length === 0) {
      return;
    }
    this.list_products();
  }

  delete_data(id: any) {
    this.productService.delete_product(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.list_products();
      },
      error: (err) => console.log(err),
    });
  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.export_products) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
      { header: 'Fecha Creación', key: 'col6', width: 30 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
