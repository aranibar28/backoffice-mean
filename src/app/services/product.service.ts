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

  list_product_by_id(id: any): Observable<any> {
    const url = `${base_url}/list_product_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_product(data: any, id: any): Observable<any> {
    const url = `${base_url}/update_product/${id}`;
    if (data.banner) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('stock', data.stock);
      fd.append('price', data.price);
      fd.append('description', data.description);
      fd.append('container', data.container);
      fd.append('category', data.category);
      fd.append('banner', data.banner);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  update_product_variety(data: any, id: any): Observable<any> {
    const url = `${base_url}/update_product_variety/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_product(id: any): Observable<any> {
    const url = `${base_url}/delete_product/${id}`;
    return this.http.delete(url, this.headers);
  }

  list_inventory_product(id: any): Observable<any> {
    const url = `${base_url}/list_inventory_product/${id}`;
    return this.http.get(url, this.headers);
  }
 
  delete_inventory_product(id: any): Observable<any> {
    const url = `${base_url}/delete_inventory_product/${id}`;
    return this.http.delete(url, this.headers);
  }

  register_inventory_product(data: any): Observable<any> {
    const url = `${base_url}/register_inventory_product`;
    return this.http.post(url, data, this.headers);
  }

  update_product_galery(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_product_galery/${id}`;
    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('image', data.image);
    return this.http.put(url, fd, this.headers);
  }

  delete_product_galery(id: any, data: any): Observable<any> {
    const url = `${base_url}/delete_product_galery/${id}`;
    return this.http.put(url, data, this.headers);
  }

}
