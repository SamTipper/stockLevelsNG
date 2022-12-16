import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHandlerService } from './services/http-handler.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stockLength: string = "Stock Levels";

  constructor(private httpService: HttpHandlerService){}

  
  ngOnInit(){
    this.httpService.getStockLength().subscribe((res) => {
      if (res.status === 200){
        this.stockLength = `${res.body} Unique Products!`;
      }
    });
  }
}
