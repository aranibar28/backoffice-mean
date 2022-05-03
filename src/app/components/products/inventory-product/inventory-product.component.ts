import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
})
export class InventoryProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public inventories: Array<any> = [];
  public excel: Array<any> = [];

  public inventory: any = {};
  public product: any = {};
  public p: number = 1;
  public uid: any;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.uid = localStorage.getItem('id');
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
  }

  ngOnInit(): void {
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    quantity: [, [Validators.required, Validators.minLength(3)]],
    supplier: [, [Validators.required]],
  });

  init_excel() {
    this.inventories.forEach(
      ({ admin: { last_name }, quantity, supplier, create_at }) => {
        this.excel.push({ last_name, quantity, supplier, create_at });
      }
    );
  }

  init_data() {
    this.productService.list_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data != undefined) {
          this.product = res.data;
          this.productService
            .list_inventory_product(this.product._id)
            .subscribe({
              next: (res) => {
                this.inventories = res.data;
                this.load_data = false;
                this.init_excel();
              },
              error: (err) => console.log(err),
            });
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
    });
  }

  registerInventory() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.myForm.addControl('product', this.fb.control(this.product._id));
    this.myForm.addControl('admin', this.fb.control(this.uid));
    this.productService
      .register_inventory_product(this.myForm.value)
      .subscribe({
        next: () => {
          this.productService
            .list_inventory_product(this.product._id)
            .subscribe({
              next: (res) => {
                this.inventories = res.data;
                this.load_btn = false;
                this.myForm.controls['quantity'].reset();
                this.myForm.controls['supplier'].reset();
              },
              error: (err) => {
                this.load_btn = false;
                console.log(err);
              },
            });

          Swal.fire('Listo!', `Se registro correctamente.`, 'success');
        },
        error: (err) => {
          this.load_btn = false;
          console.log(err);
        },
      });
  }

  delete_data(id: any, quantity: any) {
    Swal.fire({
      title: 'Eliminar registro',
      text: `¿Desea eliminar la cantidad de ${quantity} unidades?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete_inventory_product(id).subscribe({
          next: () => {
            this.productService
              .list_inventory_product(this.product._id)
              .subscribe({
                next: (res) => {
                  this.inventories = res.data;
                  this.init_data();
                },
                error: (err) => console.log(err),
              });
          },
          error: (err) => console.log(err),
        });
        Swal.fire('Listo!', `Se actualizaron los cambios.`, 'success');
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

    let fname = `Inventario de ${this.product.title}`;

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'Cantidad', key: 'col2', width: 15 },
      { header: 'Proveedor', key: 'col3', width: 25 },
      { header: 'Fecha Creación', key: 'col6', width: 30 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        fname + ' ' + new Date().toISOString().split('T')[0] + '.xlsx'
      );
    });
  }
}
