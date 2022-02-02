import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  rootURL="https://demo.credy.in/api/v1/maya/movies/";
  constructor(private http:HttpClient) { }
  getMovies(): Observable<Object> {
    const token = JSON.parse(localStorage.getItem("token") || '');

    const headers =  new HttpHeaders({
      "Content-Type": "application/json","Authorization": "Token " + token
    }) 
    return this.http.get(this.rootURL,{headers});
  }

  getMore(next: string): Observable<Object>{
    const token = JSON.parse(localStorage.getItem("token") || '');

    const headers =  new HttpHeaders({
      "Content-Type": "application/json","Authorization": "Token " + token
    }) 
    return this.http.get(next,{headers});
  }
}
