import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('usersData') usersModal:any;
  userForm:FormGroup;
  userList:any;
  rolesList:any;
  isEdit: Boolean = false;

  constructor( private fb:FormBuilder,private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.userForm = this.fb.group({
      first_name:[''],
      last_name :[''],
      email:[''],
      status :[''],
      id:[''],
      role_id:['']

    })
   }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }
  getUsers(){
    this.httpservice.doGet('users').subscribe((result)=>{
      this.userList = result.users;
    })

  }

  getRoles(){
    this.httpservice.doGet('roles').subscribe((result)=>{
      this.rolesList = result.roles
    })
  }

  addUser(type:any){
    if (type === 'Add') {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
    this.showModal();

  }


  
  editCustomer(userID:any, type:any){
      this.isEdit = true;
      this.addUser(type);
      this.httpservice.doGet(`users/${userID}`).subscribe((result)=>{
        this.userForm.patchValue({
          first_name:result.user.first_name,
          last_name:result.user.last_name,
          email:result.user.email,
          phone:result.user.phone,
          role_id:result.user.role.role_id,
          id:result.user.user_id,
          status: result.user.status
        })
      })
 


  }

  update(){
    this.httpservice.doUpdate(`users/${this.userForm.get('id')?.value}`,this.userForm.value).subscribe((res)=>{
      if (res.errorMessage) {
        this.notification.showErrorNotification('', res.errorMessage);
      } else {
        this.notification.showSucessNotification('', res.message);
        this.hideModal();
        this.getUsers();
        this.userForm.reset();
      }
    })
  }

  submit(){
    this.httpservice.doPost('users',this.userForm.value).subscribe((res)=>{
      if (res.errorMessage) {
        this.notification.showErrorNotification('', res.errorMessage);
      } else {
        this.notification.showSucessNotification('', res.message);
        this.hideModal();
        this.getUsers();
        this.userForm.reset();
      }
    })
    
  }

 

  showModal(){
    this.usersModal.show();
   }
   hideModal(){
    this.usersModal.hide();
   }

}
