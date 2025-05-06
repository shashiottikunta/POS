import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[DatePipe]
})
export class ProductComponent implements OnInit {
  @ViewChild('productData') productModal:any;
  categoriesList:any;
  productsList:any;
  productForm:FormGroup;
  productFormUpdate:FormGroup;
  selectedDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    // other options...
  };

  constructor( private fb:FormBuilder, private datePipe: DatePipe, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.productForm = this.fb.group({
      category_id:  ['',],
      prodcut_name: ['',],
      product_code:['',],
      description: ['',],
      purchase_price:['',],
      sales_price:['',],
      expiry_date:['',],
      discount:['',]

    });
     this.productFormUpdate = this.fb.group({
      category_id:  ['',],
      prodcut_name: ['',],
      product_code:['',],
      description: ['',],
      purchase_price:['',],
      sales_price:['',],
      expiry_date:['',],
      status:['',],
      id:['',],
      discount:['',],
      dicount:[]
    });
  }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  getProducts(){
    this.httpservice.doGet('products').subscribe((result)=>{
      this.productsList = result.products
    })
  }

  getCategories(){
    this.httpservice.doGet('categories').subscribe((result)=>{
      this.categoriesList = result.categories

    })
  }

  submit() {
    // Get the date from the form
    const selectedDate: Date | null = this.productForm.get('expiry_date')?.value;
  
    // Check if the date is not null before formatting
    const formattedDate: string | null = selectedDate
      ? this.datePipe.transform(selectedDate, 'yyyy-MM-dd')
      : null;
  
    // Assign the formatted date to your form data
    const formData = { ...this.productForm.value, expiry_date: formattedDate };
  
    this.httpservice.doPost('products', formData).subscribe((res: any) => {
      if (res.errorMessage) {
        this.notification.showErrorNotification('', res.errorMessage);
      } else {
        this.notification.showSucessNotification('', 'Product Added');
        this.productForm.reset();
        this.getProducts();
      }
    });
  }
  
  editProduct(productID:any){
    this.showModal();
    this.httpservice.doGet(`products/${productID}`).subscribe((result)=>{
      console.log( result )

      console.log( this.selectedDate )
      this.selectedDate = new Date(result.product.expiry_date);
      console.log( this.selectedDate )

      this.productFormUpdate.patchValue({
        category_id:result.product.category.id,
        prodcut_name:result.product.prodcut_name,
        product_code:result.product.product_code,
        description:result.product.description,
        purchase_price:result.product.purchase_price,
        sales_price:result.product.sales_price,
        expiry_date:this.selectedDate ,
        status:result.product.status,
        id:result.product.id,
        discount:result.product.discount
      })
    })

  }

  showModal(){
    this.productModal.show();
   }
   hideModal(){
    this.productModal.hide();
   }

   update(){
    const selectedDate: Date | null = this.productFormUpdate.get('expiry_date')?.value;
  
    // Check if the date is not null before formatting
    const formattedDate: string | null = selectedDate
      ? this.datePipe.transform(selectedDate, 'yyyy-MM-dd')
      : null;
  
    // Assign the formatted date to your form data
    const formData = { ...this.productFormUpdate.value, expiry_date: formattedDate };
  
    this.httpservice.doUpdate(`products/${this.productFormUpdate.get('id')?.value}`, formData).subscribe((res: any) => {
      if (res.errorMessage) {
        this.notification.showErrorNotification('', res.errorMessage);
      } else {
        this.notification.showSucessNotification('', res.message);
        this.hideModal();
      }
    });

   }

}
