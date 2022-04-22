import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  list_products(filter: any): Observable<any> {
    const url = `${base_url}/list_products/${filter}`;
    return this.http.get(url, this.headers);
  }

  register_product(data: any, file: any): Observable<any> {
    const url = `${base_url}/register_product`;
    const fd = new FormData();

    fd.append('title', data.title);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('container', data.container);
    fd.append('category', data.category);
    fd.append('banner', file);

    return this.http.post(url, fd, this.headers);
  }
}
