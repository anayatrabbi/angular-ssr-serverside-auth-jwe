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
export class SignupService {
  constructor(private http: HttpClient) {}

  PostCredential(url: string): Observable<any> {
    return this.http.post(
      url,
      { email: 'an@asthait.com', password: '123456' },
      httpOptions
    );
  }
}
