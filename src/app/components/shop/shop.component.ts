import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../app/services/product.service';
import { Products, Data } from '../../Interfaces/products';
import { Carts } from '../../Interfaces/carts';

declare var window: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  formModal: any;
  products: Data[] = [];
  carts: Carts[] = [];
  barcode: string = '';
  totalPrice = 0;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCalculator')
    );
    this.getPosts();
    this.formModal.show();
  }

  counter(i: number) {
    return new Array(i);
  }
  checkout() {
    this.formModal.show();
  }

  getPosts(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res.data;
      console.log('products');
      console.log(this.products);
    });
  }
  //add cart
  addToCart(product: Data) {
    const cartObj = {
      product_id: product._id,
      product_name: product.name,
      product_qty: 1,
      product_price: product.price,
      barcode_code: product.barcode_code,
      product_image: product.image,
    };
    if (this.carts.length === 0) {
      this.carts.push(cartObj);
    } else {
      const checkCart = this.carts.findIndex(
        (obj) => obj.product_id == product._id
      );
      if (checkCart != -1) {
        this.carts[checkCart].product_qty += 1;
      } else {
        this.carts.push(cartObj);
      }
    }

    this.getTotalPrice();
  }
  //remove cart
  removeCart(product_id: string) {
    this.carts = this.carts.filter((res) => res.product_id !== product_id);
    this.getTotalPrice();
  }

  getTotalPrice() {
    for (let i of this.carts) {
      this.totalPrice += i.product_price * i.product_qty;
    }
  }
}
