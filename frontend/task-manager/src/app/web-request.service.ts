import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = `http://localhost:9090`;
  }
  get(uri: string): Observable<Object> {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  post(uri: string, body: Object): Observable<Object> {
    return this.http.post(`${this.ROOT_URL}/${uri}`, body);
  }
  delete(uri: string): Observable<Object> {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
  patch(uri: string, body: Object): Observable<Object> {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, body);
  }
}
