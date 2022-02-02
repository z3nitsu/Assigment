import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  
  getMovies(URl: string): Observable<Object>{
    const token = JSON.parse(localStorage.getItem("token") || '');

    const headers =  new HttpHeaders({
      "Content-Type": "application/json","Authorization": "Token " + token
    }) 
    return this.http.get(URl,{headers});
  }
}
