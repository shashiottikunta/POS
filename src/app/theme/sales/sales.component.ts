import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  @ViewChild('salesData') salesModal:any;
  salesForm:FormGroup;
  salesList:any;
  totalSale:any;
  customerDetails:any;
  constructor( private fb:FormBuilder,private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 

    this.salesForm = this.fb.group({

    })
   }

  ngOnInit(): void {
    this.getSalesList();
  }

  getSalesList(){
    this.httpservice.doGet('sales').subscribe((result)=>{
      this.salesList = result.sales;
      this.totalSale = result.total_sales

    })
  }



 

  editSale(saleID:any){
    this.showModal();
    this.httpservice.doGet(`sales/${saleID}`).subscribe((result)=>{
     this.customerDetails = result
    })

  }

  update(){
    
  }

  showModal(){
    this.salesModal.show();
   }
   hideModal(){
    this.salesModal.hide();
   }

}
