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
