import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  list_coupons(filter: any): Observable<any> {
    const url = `${base_url}/list_coupons/${filter}`;
    return this.http.get(url, this.headers);
  }

  register_coupon(data: any): Observable<any> {
    const url = `${base_url}/register_coupon`;
    return this.http.post(url, data, this.headers);
  }

  list_coupon_by_id(id: any): Observable<any> {
    const url = `${base_url}/list_coupon_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_coupon(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_coupon/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_coupon(id: any): Observable<any> {
    const url = `${base_url}/delete_coupon/${id}`;
    return this.http.delete(url, this.headers);
  }
}
