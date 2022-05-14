import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
})
export class IndexCategoryComponent implements OnInit {
  public categories: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.categoryService.read_category_admin(this.word).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Categoría',
      text: `¿Desea eliminar la categoría ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete_category_admin(id).subscribe(() => {
          this.init_data();
          Swal.fire(
            'Listo!',
            `El descuento ${title} fue eliminado.`,
            'success'
          );
        });
      }
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.categories.length === 0) {
      return;
    }
    this.init_data();
  }
}
