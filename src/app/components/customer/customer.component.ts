import { Component, OnInit } from '@angular/core';
import { CustomerData } from 'src/app/Interfaces/customer';
import { CustomerService } from './../../services/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  customers: CustomerData[] = [];
  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    this.customerService.getCustomer(1, 20).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.customers = response.data;
          console.log(this.customers);
        }
      },
      error: (error) => console.log(error),
    });
  }

  updateForm(id: any) {
    this.router.navigateByUrl(`/create-customer/${id}`);
  }
}
