import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
menuList=['Dashboard', 'User Management','Employees', 'Departments', 'Cost Centers', 'Leave Management' ]
  
role;
constructor() {
    this.role=localStorage.getItem('role')
   }

  ngOnInit(): void {
  }

}
