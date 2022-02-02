import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

  rootURL = 'https://demo.credy.in/api/v1/usermodule/login/';

  getAuth(username: string, password:string): Observable<Object> {
    const payload = {
      username,
      password
    }

    const headers =  new HttpHeaders({
      "Content-Type": "application/json"
    }) 
    return this.http.post(this.rootURL,payload,{headers});
  }

  isLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }
    return false;
  }
}
