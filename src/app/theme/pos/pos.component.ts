import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  providers:[DatePipe]
})
export class PosComponent implements OnInit {
  @ViewChild('invoiceData') invoiceModal:any;
  customerDetails:any;
  posForm:FormGroup;
  hideAdd :Boolean = false;
  productsList:any;
  productsListArray: any[] = [];
  total:any;
  date = new Date();

  constructor( private fb:FormBuilder, private datePipe:DatePipe, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.posForm = this.fb.group({
      phone :[''],
      email :[''],
      produce_code :[''],
      name :['']
    })
   }
  ngOnInit(): void {
  }

  getDetails(value:any){
    let payload ={
      phone: value
    }
    this.httpservice.doPost('customer-by-phone-num', payload).subscribe((result)=>{
      this.customerDetails = result;
      if(result?.errorMessage){
        console.log(this.customerDetails)
        this.hideAdd = false
        this.posForm.patchValue({
          email :'',
          name:'',
        })
        this.notification.showErrorNotification('', result.errorMessage)
      }else{
        this.hideAdd = true
        this.posForm.patchValue({
          name:result.name,
          email:result.email,
          phone:result.phone,
        })
      }
    })

  }

  showModal(){
    this.invoiceModal.show();
   }
   hideModal(){
    this.invoiceModal.hide();
   }

   getProductDetails(productID: any) {
    this.httpservice.doGet(`product/${productID}`).subscribe((result) => {
      if (result && typeof result === 'object' && !result.errorMessage) {
        this.productsListArray.push(result);
        this.posForm.patchValue({
          produce_code :'',
        })
        const totalValue = this.productsListArray.reduce((accumulator, element) => {
          const purchasePrice = parseFloat(element.purchase_price);
          if (!isNaN(purchasePrice)) {
            return accumulator + purchasePrice;
          }
          return accumulator;
        }, 0);
        this.total = totalValue;
        console.log('Total Purchase Price:', totalValue);
     
      } else if (result && typeof result === 'object' && result.errorMessage) {
        this.notification.showWarningNotification('', result.errorMessage);
      }
    });
  }
  
  submit(){
    const newArray = this.productsListArray.map(({ id, sales_price }) => ({
      product_id: id.toString(),
      price: sales_price.toString()
    }));
    let payload={
      "customer_id":this.customerDetails.customer_id,
      "order_value":this.total,
      "quantity":this.productsListArray.length,
      "date":this.datePipe.transform(this.date, 'yyyy-MM-dd'),
      "products":newArray
    }
    this.httpservice.doPost('make-sale', payload).subscribe((result)=>{
      if(result?.errorMessage){
        this.notification.showErrorNotification('', result.errorMessage)
      }else{
        this.notification.showSucessNotification('', result.message)
        this.hideModal();
        this.productsListArray = [];
        this.total = 0;
        this.posForm.reset();
      }
    })

  }

  generateInvoice(){
    this.showModal();

  }

}
