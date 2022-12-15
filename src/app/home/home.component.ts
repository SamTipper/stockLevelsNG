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
  tableForm: FormGroup;
  private apiKey: string;
  activeButtons: boolean = false;
  stockObtained: boolean = false;
  stock: any;

  constructor(private httpService: HttpHandlerService){}

  
  ngOnInit(){
    if (localStorage.getItem("api-key") !== null){
      this.apiKey = localStorage.getItem("api-key");
    }else{
      localStorage.setItem("api-key", "temp");
    }
    this.httpService.onLoad().subscribe((res) => {
      if (res.status === 200){
        this.getStock();
      }
    })

    this.newProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productQuantity: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    this.tableForm = new FormGroup({

    });
  }

  onSubmitNewProduct(){
    console.log(this.newProductForm);
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
    
  }


}
