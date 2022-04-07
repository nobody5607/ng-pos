import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor() {}
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
    this.totalNumber = '0';
    this.checkNumber();
  }

  //submit
  submit() {
    //totalPrice ยอดเงินค่าสินค้า
    //totalNumber ยอดเงินที่จ่าย
    let total = parseFloat(this.totalNumber) - this.totalPrice;
    this.totalMoney.emit(total.toString() + '|' + this.totalNumber); //เงินทอน|จำนวนเงินที่จ่าย 10|100
    //this.formModal.hide();
    this.clear();
  }
}
