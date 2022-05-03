import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
})
export class IndexProductComponent implements OnInit {
  public load_data: boolean = true;
  public products: Array<any> = [];
  public excel: Array<any> = [];

  public word: string = '';
  public url: string = '';
  public p: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_excel() {
    this.products.forEach(
      ({ title, stock, price, category, num_sales, create_at }) => {
        this.excel.push({ title, stock, price, category, num_sales, create_at });
      }
    );
  }

  init_data() {
    this.productService.list_products(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.load_data = false;
        this.init_excel();
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.products.length === 0) {
      return;
    }
    this.init_data();
  }

  delete_data(id: any, name: any) {
    Swal.fire({
      title: 'Eliminar Producto',
      text: `¿Desea eliminar el Producto ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete_product(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `El producto ${name} fue eliminado.`, 'success');
        });
      }
    });
  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.excel) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'Lista de Productos';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
      { header: 'Fecha Creación', key: 'col6', width: 30 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + ' ' + new Date().toISOString().split('T')[0] + '.xlsx');
    });
  }
}
