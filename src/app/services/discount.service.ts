import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url;
@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_discount_admin(data: any, file: any): Observable<any> {
    const url = `${base_url}/create_discount_admin`;
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('discount', data.discount);
    fd.append('start_date', data.start_date);
    fd.append('finish_date', data.finish_date);
    fd.append('banner', file);
    return this.http.post(url, fd, this.headers);
  }

  read_discounts_admin(filter: any): Observable<any> {
    const url = `${base_url}/read_discounts_admin/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_discount_by_id(id: any): Observable<any> {
    const url = `${base_url}/read_discount_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_discount_admin(data: any, id: any): Observable<any> {
    const url = `${base_url}/update_discount_admin/${id}`;
    if (data.banner) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('discount', data.discount);
      fd.append('start_date', data.start_date);
      fd.append('finish_date', data.finish_date);
      fd.append('banner', data.banner);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  delete_discount_admin(id: any): Observable<any> {
    const url = `${base_url}/delete_discount_admin/${id}`;
    return this.http.delete(url, this.headers);
  }
}
