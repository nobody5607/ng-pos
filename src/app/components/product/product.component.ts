import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../app/services/product.service';
import { Data } from '../../Interfaces/products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Data[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  updateForm(product: any) {
    console.log(product);
    this.router.navigateByUrl(`/create-product/${product._id}`);
  }
}
