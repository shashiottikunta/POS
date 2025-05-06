import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HomeComponent } from './theme/home/home.component';
import { CategoryComponent } from './theme/category/category.component';
import { ProductComponent } from './theme/product/product.component';
import { CustomersComponent } from './theme/customers/customers.component';
import { SalesComponent } from './theme/sales/sales.component';
import { UsersComponent } from './theme/users/users.component';
import { PosComponent } from './theme/pos/pos.component';
import { GenerateInvoiceComponent } from './theme/generate-invoice/generate-invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    CustomersComponent,
    SalesComponent,
    UsersComponent,
    PosComponent,
    GenerateInvoiceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    NgbModule,
    TabsModule,
    HttpClientModule,
    ToastrModule.forRoot(
    ),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    PaginationModule.forRoot() ,
    ModalModule,
    TooltipModule.forRoot(),

   ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
