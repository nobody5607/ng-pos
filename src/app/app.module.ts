import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './components/shop/shop.component';

import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcDiscountComponent } from './components/calc-discount/calc-discount.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { NavbarLeftComponent } from './components/layout/navbar-left/navbar-left.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { ReportComponent } from './components/report/report.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ProductHistoryComponent } from './components/product-history/product-history.component';
import { BranchComponent } from './components/branch/branch.component';
import { StaffComponent } from './components/staff/staff.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { DiscountComponent } from './components/discount/discount.component';
import { SettingComponent } from './components/setting/setting.component';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DashboardComponent,
    PostDetailComponent,
    ShopComponent,
    CalculatorComponent,
    CalcDiscountComponent,
    LoginComponent,
    ProductComponent,
    CreateProductComponent,
    NavbarComponent,
    NavbarLeftComponent,
    CustomerComponent,
    CreateCustomerComponent,
    ReportComponent,
    TransactionComponent,
    ProductHistoryComponent,
    BranchComponent,
    StaffComponent,
    PromotionComponent,
    DiscountComponent,
    SettingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
