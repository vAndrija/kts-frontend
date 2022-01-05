import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(public http: HttpClient) { }
}
