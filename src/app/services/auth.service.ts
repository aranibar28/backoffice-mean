import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    if (!this.token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(this.token!);
      if (!decodedToken) {
        localStorage.removeItem('token');
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
    return allowRoles.includes(decodedToken['role']);
  }

  login_admin(data: any): Observable<any> {
    const url = `${base_url}/login_admin/`;
    return this.http.post(url, data, this.headers);
  }

  get_config_admin(): Observable<any> {
    const url = `${base_url}/get_config_admin`;
    return this.http.get(url, this.headers);
  }

  get_config_public(): Observable<any> {
    const url = `${base_url}/get_config_public`;
    return this.http.get(url, this.headers);
  }

  update_config_admin(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_config_admin/${id}`;
    if (data.logo) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('serie', data.serie);
      fd.append('correlative', data.correlative);
      fd.append('categories', JSON.stringify(data.categories));
      fd.append('logo', data.logo);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  get_messages_admin(): Observable<any> {
    const url = `${base_url}/get_messages_admin`;
    return this.http.get(url, this.headers);
  }

  close_message_admin(id: any, data: any): Observable<any> {
    const url = `${base_url}/close_message_admin/${id}`;
    return this.http.put(url, data, this.headers);
  }
}
