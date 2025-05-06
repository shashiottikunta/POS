import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted = false;
  
  constructor( private fb:FormBuilder, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.loginForm=this.fb.group({
      email:[''],
      password:['']

    })
  }

  ngOnInit(): void {
    localStorage.clear();
  }
  submit(){
    let payload ={
      'username': this.loginForm.get('email')?.value,
      'password':  this.loginForm.get('password')?.value,
    }
    this.httpservice.doPost('login', payload).subscribe((res:any) => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
        localStorage.setItem('role', res.role);
        localStorage.setItem('access-token', res.access_token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userName', res.first_name + ' ' + res.last_name);
        if(res.role === 'admin'){
          this.router.navigate(['/home']);
        }else if(res.role === 'Car Owner'){
          this.router.navigate(['/carOwner-dashboard']);
        }
    
       
          this.notification.showSucessNotification('','Login Success')

     
        
      }
    })
  }
}
