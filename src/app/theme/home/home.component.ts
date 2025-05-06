import { Component, OnInit , ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
export interface chart {
  name: string;
  key: string;
  val: Array<string>;
  href1: string;
  href2: string;
  id: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data: any;
 

  constructor(private elementRef: ElementRef, private httpservice:HttpService, private notification:NotificationService) {
    
  } 
  
  

 
 
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.httpservice.doGet('dashboard').subscribe((result)=>{
      this.data = result;
    })
  }

  



  
  

}
