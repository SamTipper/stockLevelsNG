import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit{
  newApiKeyForm: FormGroup;
  submitted: boolean = false;

  ngOnInit(){
    this.newApiKeyForm = new FormGroup({
      apiKey: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    localStorage.setItem("api-key", this.newApiKeyForm.value.apiKey);
    this.submitted = true;
  }
}
