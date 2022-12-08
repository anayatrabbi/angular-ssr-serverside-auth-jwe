import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getItems(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  getSession(url:string):Observable<any>{
    return this.http.get(url , httpOptions)
  }
}
