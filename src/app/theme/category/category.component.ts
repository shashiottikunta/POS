import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('categoryData') categoryModal:any;
  categoriesList:any;
  displayCount = 3;
  addCategoryForm:FormGroup;
  editCategoryForm:FormGroup;
  constructor( private fb:FormBuilder, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.addCategoryForm = this.fb.group({
      categoryName:['',],
    })
    this.editCategoryForm = this.fb.group({
      categoryName:['',],
      status:['',],
      id:['']

    })
   }

   loadMore() {
    this.displayCount = this.categoriesList.length; // Show all records
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.httpservice.doGet('categories').subscribe((result)=>{
      this.categoriesList = result.categories

    })
  }

  submit(){
    let payload ={
      name : this.addCategoryForm.get('categoryName')?.value
    }
    this.httpservice.doPost('categories', payload).subscribe((res:any) => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        this.notification.showSucessNotification('','Category Added');
        this.addCategoryForm.reset();
        this.getCategories();
      }
    })
    
  }
  update(){
    let payload ={
      name : this.editCategoryForm.get('categoryName')?.value,
      status: this.editCategoryForm.get('status')?.value
    }
    this.httpservice.doUpdate('categories/'+this.editCategoryForm.get('id')?.value, payload).subscribe((res:any) => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        this.notification.showSucessNotification('','Category Updated');
        this.editCategoryForm.reset();
        this.getCategories();
        this.hideModal();
      }
    })

  }

  showModal(){
    this.categoryModal.show();
   }
   hideModal(){
    this.categoryModal.hide();
   }

   editCategory(id:any){
    this.showModal();
    this.httpservice.doGet('categories/'+id).subscribe((result)=>{
      this.editCategoryForm.patchValue({
        categoryName:result.categories.name,
        status:result.categories.status,
        id :result.categories.id
      })
    })
   }

}
