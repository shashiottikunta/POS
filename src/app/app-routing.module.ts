import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './theme/home/home.component';
import { CategoryComponent } from './theme/category/category.component';
import { ProductComponent } from './theme/product/product.component';
import { CustomersComponent } from './theme/customers/customers.component';
import { SalesComponent } from './theme/sales/sales.component';
import { UsersComponent } from './theme/users/users.component';
import { PosComponent } from './theme/pos/pos.component';
import { GenerateInvoiceComponent } from './theme/generate-invoice/generate-invoice.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignUpComponent },




  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductComponent },

      { path: 'customers', component: CustomersComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'pos', component: PosComponent },
      { path: 'generate-invoice', component: GenerateInvoiceComponent },


  //     {
  //       path: '',
  //       loadChildren: () => import('./profile/profile.module')
  //         .then(user => user.ProfileModule),
  //     },
  //     {
  //       path: '',
  //       loadChildren: () => import('./dashboard/dashboard.module')
  //         .then(user => user.DashboardModule),
  //     },
  //     {
  //       path: '',
  //       loadChildren: () => import('./all-list/all-list.module')
  //         .then(user => user.AllListModule),
  //     },
  //     { path: 'addcar', component: AddCarComponent },

  //     { path: 'car-list', component: CarsListComponent },

     ]



  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
