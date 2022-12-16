import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHandlerService } from '../services/http-handler.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  newProductForm: FormGroup;
  quantityForm:   FormGroup;
  private apiKey: string;
  activeButtons:  boolean = false;
  stockObtained:  boolean = false;
  stock:          any;
  
  constructor(private httpService: HttpHandlerService){}
  
  ngOnInit(){
    
    this.httpService.getApiKey();
    this.apiKey = localStorage.getItem("api-key");

    this.httpService.onLoad().subscribe((res) => {
      if (res.status === 200){
        if (res.body !== this.apiKey){
          localStorage.setItem("api-key", res.body);
        }
        this.getStock();
      }
    })

    this.newProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productQuantity: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSubmitNewProduct(){
    const name = this.newProductForm.value.productName; const quant = this.newProductForm.value.productQuantity;
    this.newProductForm.reset();
    this.stockObtained = false;
    this.activeButtons = false;

    this.httpService.addNewItem({item: this.capitalizeFirstLetter(name), quantity: quant})
      .subscribe((res) => {
        if (res.status === 200){
          this.getStock()
        }
      })
  }

  getStock() {
    this.httpService.getProducts().subscribe((res) => {
      if (res.status === 200){
        this.stock = JSON.parse(res.body);
        this.activeButtons = true;
        this.stockObtained = true;
      }
    })
  }

  saveProductChanges(){
    this.activeButtons = false;
    this.httpService.sendUpdatedStockCount(this.stock).subscribe((res) => {
      if (res.status === 200){
        this.activeButtons = true;
      }
    })
  }

  onQuantityChange(prodName, prodQuantity){
    if (prodQuantity.innerHTML !== "" && +prodQuantity.innerHTML >= 0){
      this.stock[prodName.innerHTML] = +prodQuantity.innerHTML;
      console.log(prodName.innerHTML, this.stock[prodName.innerHTML]);
    }
  }

  onReload(){
    this.activeButtons = false;
    this.stockObtained = false;
    this.getStock();
  }

}
