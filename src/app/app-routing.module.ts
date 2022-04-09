import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'create-customer/:id', component: CreateCustomerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'create-product/:id', component: CreateProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shop', component: ShopComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
