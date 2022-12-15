import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  statusCode: number;
  constructor(private http: HttpClient) { }
  

  onLoad(){
    return this.http.get(
      "https://API.samtipper.repl.co/auth-user",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }

  getProducts(){
    return this.http.get(
      "https://API.samtipper.repl.co/stock-list",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }

}
