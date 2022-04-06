import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../app/services/product.service';
import { Data } from '../../Interfaces/products';
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
  modalSuccess: any;
  payment_return: any;
  products: Data[] = [];
  order?: OrderData;
  carts: Carts[] = [];
  barcode: string = '';
  totalPrice = 0; //รวมเงิน
  print_form = false;
  // totalMoney: any; //เงินทอน
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCalculator')
    );
    this.modalSuccess = new window.bootstrap.Modal(
      document.getElementById('modalSuccess')
    );

    this.getProduct();

    // this.formModal.show();
  }

  print() {
    this.print_form = true;
    var divContents = window.document.getElementById('print').innerHTML;
    let w = 1000;
    let h = 768;

    var left = screen.width / 2 - w / 2;
    var top = screen.height / 2 - h / 2;
    var a = window.open(
      '',
      '',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    );
    a.document.write('<html>');
    a.document.write('<html><head><title></title>');
    a.document.write(
      `
        <style> 
              @media print {

                @page {
                  margin: 0;
                  size: A4 portrait;  
                }
                body{
                  padding:0;
                  margin:0;
                }
                .page{
                  padding:0;
                  margin:0;
                  width:320px; 
                  margin-top:5px;
                }
                .text-centers{text-align:center;}
                .text-rights{text-align:right;}
                .list{
                  padding:3px;
                  display:flex;
                  justify-content: space-between;
                }
              }

              .page{
                padding:0;
                margin:0;
                width:320px; 
                margin-top:5px;
              }
              .text-centers{text-align:center;}
              .text-rights{text-align:right;}
              .list{
                padding:3px;
                display:flex;
                justify-content: space-between;
              }
        </style>
      `
    );
    a.document.write('</head><body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    setTimeout(() => {
      a.onafterprint = a.close;
      a.print();
      //this.print_form = false;
    }, 100);
  }

  //แสดง modal เครื่องคิดเลข
  checkout() {
    this.formModal.show();
  }
  //แสดงสินค้า
  getProduct(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res.data;
    });
  }
  scanBarcode(e: any) {
    if (this.barcode.length >= 5) {
      this.getProductByBarcode();
    }
  }
  getProductByBarcode(): void {
    this.productService.getProuctByBarcode(this.barcode).subscribe((res) => {
      if (res) {
        this.addToCart(res);
        this.barcode = '';
      }
    });
  }
  //เพิ่มลงตะกร้า
  addToCart(product: any) {
    const cartObj = {
      product_id: product._id,
      product_name: product.name,
      product_qty: 1,
      product_price: product.price,
      unit: product.units.name ? product.units.name.toString() : '',
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
    //console.log(this.carts);
    this.getTotalPrice();
  }
  //ลบตะกร้า
  removeCart(product_id: string) {
    this.carts = this.carts.filter((res) => res.product_id !== product_id);
    this.getTotalPrice();
  }
  //รวมเงิน
  getTotalPrice() {
    this.totalPrice = 0;
    for (let i of this.carts) {
      this.totalPrice += i.product_price * i.product_qty;
    }
  }

  //เงินทอน
  submitOrder(money: string) {
    console.log(this.carts);
    console.log(Math.round(parseFloat(money)));
    console.log(money); //เงินทอน
    let payment = money.split('|');

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
      payment_all: payment[1] ? payment[1] : 0,
      payment_return: payment[0] ? payment[0] : 0,
      price: this.totalPrice,
      totalPrice: this.totalPrice,
    };
    this.payment_return = payment[0];
    this.formModal.hide();
    this.modalSuccess.show();

    let formData = new FormData();
    formData.append('data', JSON.stringify(order));

    this.orderService.createOrder(formData).subscribe({
      next: (response) => {
        this.print_form = true;
      },
      error: (error) => console.error(error),
    });
  }

  closeOrder() {
    this.totalPrice = 0;
    this.carts = [];
    this.print_form = false;
  }
}
