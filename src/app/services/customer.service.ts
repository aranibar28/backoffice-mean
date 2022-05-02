import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public user: any;
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  list_customers(type: any, filter: any): Observable<any> {
    const url = `${base_url}/list_customers/${type}/${filter}`;
    return this.http.get(url, this.headers);
  }

  list_customer_by_id(id: any): Observable<any> {
    const url = `${base_url}/list_customer_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  register_customer_admin(data: any): Observable<any> {
    const url = `${base_url}/register_customer_admin`;
    return this.http.post(url, data, this.headers);
  }

  update_customer_admin(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_customer_admin/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_customer_admin(id: any): Observable<any> {
    const url = `${base_url}/delete_customer_admin/${id}`;
    return this.http.delete(url, this.headers);
  }
}
