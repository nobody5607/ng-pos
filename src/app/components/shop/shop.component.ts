import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../app/services/product.service';
import { Data } from '../../Interfaces/products';
import { OrderData } from '../../Interfaces/order';
import { Carts } from '../../Interfaces/carts';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import * as moment from 'moment';

declare var window: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  formModal: any;
  formModalDisprice: any;
  modalSuccess: any;
  payment_return: any;
  products: Data[] = [];
  order?: OrderData;
  carts: Carts[] = [];
  barcode: string = '';
  totalPrice = 0; //รวมเงิน
  price = 0; //เงินที่ยังไม่ลด
  discountPrice = 0; //ส่วนลด
  print_form = false;
  modal_type: any; //ประเภท คำนวน ส่วนลด หรือ จำนวนสินค้า
  select_data: any; // คลิงเปลี่ยนแปลงจำนวนสินค้า
  disabled_btn_checkout = true;
  useLogin: any;
  customer_name = '';
  create_date = '';
  // totalMoney: any; //เงินทอน
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.useLogin = this.authService.getUserInfo();

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalCalculator')
    );
    this.formModalDisprice = new window.bootstrap.Modal(
      document.getElementById('formModalDisprice')
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

    var left = window.screen.width / 2 - w / 2;
    var top = window.screen.height / 2 - h / 2;
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
      if (checkCart !== -1) {
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
    if (this.totalPrice > 0) {
      this.disabled_btn_checkout = false;
    } else {
      this.disabled_btn_checkout = true;
    }
  }

  //เงินทอน
  submitOrder(money: string) {
    console.log(this.carts);
    console.log(Math.round(parseFloat(money)));
    console.log(money); //เงินทอน
    this.price = this.totalPrice;
    let payment = money.split('|');
    if (payment.length >= 3) {
      this.customer_name = payment[3];
    }
    let order = {
      customer: payment.length >= 3 ? payment[2] : '6251e27d93a023530f06d0ae',
      orderItems: this.carts,
      discount: {
        discount_type: '฿', //%,฿
        discount_price: this.discountPrice, //เงินลด
      },
      coupon: {
        coupon_code: '',
        discount: 0,
      },
      vat: 0,
      payment_method: 'cash',
      payment_all: payment[1] ? payment[1] : 0,
      payment_return: payment[0] ? payment[0] : 0,
      price: this.price,
      totalPrice: this.totalPrice,
    };
    this.payment_return = payment[0];

    let formData = new FormData();
    formData.append('data', JSON.stringify(order));
    this.create_date = moment().format('YYYY-MM-DD HH:mm:ss');
    this.orderService.createOrder(formData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.print_form = true;
          this.formModal.hide();
          this.modalSuccess.show();
          this.getProduct();
          // this.closeOrder();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.message,
            showConfirmButton: true,
          });
        }
      },
      error: (error) => console.error(error),
    });
  }

  closeOrder() {
    this.totalPrice = 0;
    this.price = 0;
    this.discountPrice = 0;
    this.carts = [];
    this.print_form = false;
    this.create_date = '';
  }

  //
  dispriceFunc(modal_type: any, select_data: any) {
    this.modal_type = modal_type;
    this.select_data = select_data;
    this.formModalDisprice.show();
  }
  discountMoneyFunc(data: string) {
    if (this.modal_type === 'cart') {
      console.log(this.select_data);

      const checkCart = this.carts.findIndex(
        (obj) => obj.product_id == this.select_data.product_id
      );
      if (checkCart != -1) {
        this.carts[checkCart].product_qty = parseFloat(data);
        this.carts[checkCart].total_price =
          this.carts[checkCart].product_price *
          this.carts[checkCart].product_qty;
        this.getTotalPrice();
      }
    } else {
      this.discountPrice = parseFloat(data);
      this.price = this.totalPrice;
      this.totalPrice -= this.discountPrice;
    }

    //this.dis
  }
}
