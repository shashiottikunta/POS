import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers:[DatePipe]
})
export class CustomersComponent implements OnInit {
  @ViewChild('customersData') customersModal:any;
  customerForm:FormGroup;
  customersList:any;
  customerFormUpdate:FormGroup;
  constructor( private fb:FormBuilder, private datePipe: DatePipe, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    
  
    this.customerForm = this.fb.group({
      name:[''],
      email:[''],
      phone:[''],
    })
    
    this.customerFormUpdate = this.fb.group({
      name:[''],
      email:[''],
      phone:[''],
      id:['']
    })
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.httpservice.doGet('customers').subscribe((result)=>{
      this.customersList = result.customers
    })
  }
  submit(){
    this.httpservice.doPost('customer', this.customerForm.value).subscribe((result)=>{
      if(result?.errorMessage){
        this.notification.showErrorNotification('', result.errorMessage)
      }else{
        this.notification.showSucessNotification('', 'Customer Added Successfully')
        this.customerForm.reset();
        this.getCustomers();
      }
    })
    
  }
 update(){
  this.httpservice.doUpdate(`customer/${this.customerFormUpdate.get('id')?.value}`, this.customerFormUpdate.value).subscribe((result)=>{
    if(result?.errorMessage){
      this.notification.showErrorNotification('', result.errorMessage)
    }else{
      this.notification.showSucessNotification('', 'Customer Updated Successfully')
      this.customerForm.reset();
      this.getCustomers();
      this.hideModal();
    }
  })
  
 }
  editCustomer(customerId:any){
    this.showModal();
    this.httpservice.doGet(`customer/${customerId}`).subscribe((result)=>{
      this.customerFormUpdate.patchValue({
        name:result.name,
        email:result.email,
        phone:result.phone,
        id:result.customer_id
      })
    })

  }

  showModal(){
    this.customersModal.show();
   }
   hideModal(){
    this.customersModal.hide();
   }

}
