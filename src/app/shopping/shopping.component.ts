import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from '../services/http-handler.service'

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit{
  private apiKey: string;
  shoppingList: any;
  savedListText: string;
  savedListBool: boolean;
  activeButtons: boolean;
  stockObtained: boolean = false;


  constructor(private httpService: HttpHandlerService){}

  ngOnInit(){
    this.httpService.getApiKey();
    this.apiKey = localStorage.getItem("api-key");

    this.httpService.onLoad().subscribe((res) => {
      if (res.status === 200){
        if (res.body !== this.apiKey){
          localStorage.setItem("api-key", res.body);
        }
        this.getShoppingList();
      }
    })
  }

  getShoppingList(){
    this.httpService.getShoppingList().subscribe((res) => {
      if (res.status === 200){
        let list = JSON.parse(res.body);
        delete list.version;
        this.shoppingList = list;
        this.savedListText = list['version'] ? "Saved Shopping List" : "Unsaved Shopping List";
        this.savedListBool = list['version'] ? true : false;
        this.stockObtained = true;
      }
    })
  }

  saveShoppingList(){

  }



}
