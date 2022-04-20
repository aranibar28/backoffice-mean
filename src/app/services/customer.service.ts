import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public url: string = '';

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  list_customers(type: any, filter: any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'token':token});
    return this.http.get(`${this.url}list_customers/${type}/${filter}`, {headers});
  }
}
