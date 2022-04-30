import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
})
export class InventoryProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public inventories: Array<any> = [];
  public export_inventory: Array<any> = [];
  public inventory: any = {};
  public product: any = {};
  public uid: any;
  public p: number = 1;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.uid = localStorage.getItem('id');
  }

  ngOnInit(): void {
    this.list_inventory_product();
  }

  list_inventory_product() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.list_product_by_id(this.id).subscribe({
        next: (res) => {
          if (res.data != undefined) {
            this.product = res.data;
            this.productService
              .list_inventory_product(this.product._id)
              .subscribe({
                next: (res) => {
                  this.inventories = res.data;
                  this.inventories.forEach((element) => {
                    this.export_inventory.push({
                      admin: element.admin.last_name,
                      quantity: element.quantity,
                      supplier: element.supplier,
                      create_at: element.create_at,
                    });
                  });
                  this.load_data = false;
                },
                error: (err) => console.log(err),
              });
          } else {
            this.router.navigateByUrl('/dashboard/productos');
          }
        },
        error: (err) => console.log(err),
      });
    });
  }

  eliminar(id: any) {  
    this.productService.delete_inventory_product(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'OK',
          message: 'Se eliminó correctamente!',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.productService.list_inventory_product(this.product._id).subscribe({
          next: (res) => {
            this.inventories = res.data;
            this.list_inventory_product();
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }

  registerInventory(inventoryForm: any) {
    if (inventoryForm.valid) {
      let data = {
        product: this.product._id,
        quantity: inventoryForm.value.quantity,
        supplier: inventoryForm.value.supplier,
        admin: this.uid,
      };
      this.load_btn = true;
      this.productService.register_inventory_product(data).subscribe({
        next: () => {
          this.productService
            .list_inventory_product(this.product._id)
            .subscribe({
              next: (res) => {
                this.load_btn = false;
                this.inventories = res.data;
              },
              error: (err) => {
                this.load_btn = false;
                console.log(err);
              },
            });
          inventoryForm.reset();
          iziToast.success({
            title: 'OK',
            message: 'Se registro correctamente!',
          });
        },
        error: (err) => {
          this.load_btn = false;
          console.log(err);
        },
      });
    } else {
      iziToast.error({
        title: 'Error!',
        message: 'Los datos del formulario no son válidos',
      });
    }
  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.export_inventory) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'REP01- ';

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
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
