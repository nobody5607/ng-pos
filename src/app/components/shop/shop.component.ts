import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../app/services/product.service';
import { Products, Data } from '../../Interfaces/products';
import { OrderData } from '../../Interfaces/order';
import { Carts } from '../../Interfaces/carts';
import { OrderService } from '../../services/order.service';

declare var window: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  formModal: any;
  products: Data[] = [];
  order?: OrderData;
  carts: Carts[] = [];
  barcode: string = '';
  totalPrice = 0; //รวมเงิน
  totalMoney: any; //เงินทอน
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCalculator')
    );
    this.getPosts();
    // this.formModal.show();
  }

  //แสดง modal เครื่องคิดเลข
  checkout() {
    this.formModal.show();
  }
  //แสดงสินค้า
  getPosts(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res.data;
    });
  }
  //เพิ่มลงตะกร้า
  addToCart(product: Data) {
    const cartObj = {
      product_id: product._id,
      product_name: product.name,
      product_qty: 1,
      product_price: product.price,
      product_cost: product.cost,
      barcode_code: product.barcode_code,
      product_image: product.image,
      total_price: product.price * 1,
    };
    if (this.carts.length === 0) {
      this.carts.push(cartObj);
    } else {
      const checkCart = this.carts.findIndex(
        (obj) => obj.product_id == product._id
      );
      if (checkCart != -1) {
        this.carts[checkCart].product_qty += 1;
        this.carts[checkCart].total_price =
          this.carts[checkCart].product_price *
          this.carts[checkCart].product_qty;
      } else {
        this.carts.push(cartObj);
      }
    }

    this.getTotalPrice();
  }
  //ลบตะกร้า
  removeCart(product_id: string) {
    this.carts = this.carts.filter((res) => res.product_id !== product_id);
    this.getTotalPrice();
  }
  //รวมเงิน
  getTotalPrice() {
    for (let i of this.carts) {
      this.totalPrice += i.product_price * i.product_qty;
    }
  }
  //เงินทอน
  submitOrder(money: string) {
    console.log(this.carts);
    console.log(Math.round(parseFloat(money)));
    console.log(money); //เงินทอน
    console.log(this.totalPrice);
    let order = {
      customer: '6247da6c8904fb3a816373d8',
      orderItems: this.carts,
      discount: {
        discount_type: '%', //%,฿
        discount_price: 0, //เงินลด
      },
      coupon: {
        coupon_code: '',
        discount: 0,
      },
      vat: 0,
      payment_method: 'cash',
      price: 0,
      totalPrice: 0,
    };
    let formData = new FormData();
    formData.append('data', JSON.stringify(order));
    this.orderService.createOrder(formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }
}
