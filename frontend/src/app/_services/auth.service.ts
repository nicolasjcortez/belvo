import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';



const AUTH_API = api.url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
    .set('username', username)
    .set('password', password);

    return this.http.post(AUTH_API + 'token/',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'users/', {
      "username": username,
      "email": email,
      "password": password
    }, httpOptions);
  }
}
