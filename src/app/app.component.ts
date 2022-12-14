import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newProductForm: FormGroup;
  tableForm: FormGroup;

  ngOnInit(){
    this.newProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productQuantity: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    this.tableForm = new FormGroup({
      
    })
  }

  onSubmitNewProduct(){
    console.log(this.newProductForm);
  }
}
