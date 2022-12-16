import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  private apiKey: string;
  constructor(private http: HttpClient) { }
  
  getApiKey(){
    if (localStorage.getItem("api-key") !== null){
      this.apiKey = localStorage.getItem("api-key");
    }else{
      localStorage.setItem("api-key", "temp");
    }
  }

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

  getStockLength(){
    return this.http.get(
      "https://API.samtipper.repl.co/get",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }

  sendUpdatedStockCount(stock){
    const headers = new HttpHeaders({"Api-Key": localStorage.getItem("api-key")});
    return this.http.post(
      "https://api.samtipper.repl.co/update-stock", stock, {headers: headers, observe: "response", responseType: "text"})
  }

  addNewItem(item){
    const headers = new HttpHeaders({"Api-Key": localStorage.getItem("api-key")});
    return this.http.post(
      "https://api.samtipper.repl.co/add-item", item, {headers: headers, observe: "response", responseType: "text"})
  }

  getShoppingList(){
    return this.http.get(
      "https://API.samtipper.repl.co/shopping-list",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }

  saveShoppingList(shoppingList){
    const headers = new HttpHeaders({"Api-Key": localStorage.getItem("api-key")});
    return this.http.post(
      "https://api.samtipper.repl.co/update-list", shoppingList, {headers: headers, observe: "response", responseType: "text"})
  }

  newShoppingList(){
    return this.http.get(
      "https://API.samtipper.repl.co/new-list",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }

  submitShopping(){
    return this.http.get(
      "https://API.samtipper.repl.co/shopping-done",
     {
      headers: {"Api-Key": localStorage.getItem("api-key")},
      observe: "response",
      responseType: "text"
     })
  }
    
}
