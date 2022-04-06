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
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DashboardComponent,
    PostDetailComponent,
    ShopComponent,
    CalculatorComponent,
    CalcDiscountComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
