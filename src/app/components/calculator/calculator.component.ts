import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerData } from '../../Interfaces/customer';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  @Input('totalPrice') totalPrice = 0;
  @Input('formModal') formModal: any;

  @Output() totalMoney = new EventEmitter<string>();

  disabledSubmit = true;
  totalNumber = '0';
  showMember = false;
  member_id = '';
  customer!: CustomerData;
  customer_message = 'ค้นหาหมายเลขสมาชิก';

  select_member = '';
  constructor(private customerService: CustomerService) {}
  ngOnInit(): void {}

  //จำนวนเงินเป็นตัวเลข
  setNumber(number: any) {
    let num = '';
    if (this.totalNumber != '0') {
      num += `${this.totalNumber}${number}`;
    } else {
      num = `${number}`;
    }

    if (num == '0.00') {
      num = '0';
    }

    let checkFloat = num.split('.');
    if (checkFloat.length >= 2) {
      if (checkFloat[1].length > 2) {
        return;
      }
    }

    this.totalNumber = num;
    this.checkNumber();
  }

  //. ทสนิยม
  setDot(number: any) {
    if (this.totalNumber.split('.').length < 2) {
      this.totalNumber = this.totalNumber + number;

      this.checkNumber();
    }
  }

  //จำนวนเงิน 100 500 1000
  fullNumber(number: any) {
    let total = parseFloat(this.totalNumber) + parseFloat(number);
    this.totalNumber = total.toString();
    this.checkNumber();
  }

  //เต็มจำนวนเงินที่ซื้อ
  fullNumberAll() {
    this.totalNumber = this.totalPrice.toString();
    this.checkNumber();
  }

  checkNumber() {
    //totalPrice ค่าสินค้า
    //totalNumber เงินที่จ่าย

    if (parseFloat(this.totalNumber) < parseFloat(this.totalPrice.toString())) {
      this.disabledSubmit = true; //เงินที่จ่าย < ค่าสินค้า
    } else {
      this.disabledSubmit = false; //เงินที่จ่าย > ค่าสินค้า จะแสดงปุ่มกดยืนยันได้
    }
  }

  //ลบข้อมูลจากหลังไปหน้า
  remove() {
    if (this.totalNumber.length == 1) {
      this.totalNumber = '0';
    } else {
      this.totalNumber = this.totalNumber.slice(0, -1);
    }
    this.checkNumber();
  }
  //ล้างข้อมูล
  clear() {
    this.select_member = '';
    this.totalNumber = '0';
    this.checkNumber();
  }

  //submit
  submit() {
    //totalPrice ยอดเงินค่าสินค้า
    //totalNumber ยอดเงินที่จ่าย
    let member = '';
    if (this.select_member) {
      member = `|${this.select_member}`;
    }
    let total = parseFloat(this.totalNumber) - this.totalPrice;
    this.totalMoney.emit(total.toString() + '|' + this.totalNumber + member); //เงินทอน|จำนวนเงินที่จ่าย 10|100
    //this.formModal.hide();
    this.clear();
  }

  closeModal() {
    this.clear();
    this.formModal.hide();
  }

  //member
  back() {
    this.showMember = false;
  }
  filterMember() {
    this.showMember = true;
  }
  searchMemberById() {
    if (this.member_id.length >= 5) {
      //  this.cus
      this.customerService.searchCustomer(this.member_id).subscribe({
        next: (response: any) => {
          this.customer_message = '';
          if (response.status === 'success') {
            this.customer = response.data;
            this.member_id = response.data.member_id;
            console.log(this.customer);
          } else if (response.status === 'warning') {
            console.log(response.message);
            this.customer_message = response.message;
          }
        },
        error: (error) => {
          this.customer_message = '';
          console.log(error);
        },
      });
    }
  }
  selectMember() {
    this.select_member = this.customer._id;
    this.showMember = false;
  }

  selectMemberIdOnRegister(id: string) {
    this.member_id = id;
    this.searchMemberById();
    (document.getElementById('home-tab') as HTMLFormElement).click();
  }
}
