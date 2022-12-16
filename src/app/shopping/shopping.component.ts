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
  unsavedList: boolean;
  savedList: boolean;

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
    this.unsavedList = false;
    this.savedList = false;

    this.httpService.getShoppingList().subscribe((res) => {
      if (res.status === 200){
        let list = JSON.parse(res.body);
        this.savedListText = list['version'] ? "Saved Shopping List" : "Unsaved Shopping List";
        this.unsavedList = list['version'] ? false : true;
        this.savedList = list['version'] ? true : false;
        delete list.version;
        this.shoppingList = list;
      }
    })
  }

  saveShoppingList(){
    this.httpService.saveShoppingList(this.shoppingList).subscribe((res) => {
      if (res.status === 200){
        this.getShoppingList();
      }
    })
  }

  newShoppingList(){
    this.httpService.newShoppingList().subscribe((res) => {
      if (res.status === 200){
        this.getShoppingList();
      }
    })
  }

  onQuantityChange(prodName, prodQuantity){
    if (prodQuantity.innerHTML !== "" && +prodQuantity.innerHTML >= 0){
      this.shoppingList[prodName.innerHTML] = +prodQuantity.innerHTML;
    }
  }


}
