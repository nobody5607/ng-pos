import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}
  totalNumber = '1';
  ngOnInit(): void {}

  setNumber(number: any) {
    let num = '';
    if (this.totalNumber != '0') {
      num += `${this.totalNumber}${number}`;
    } else {
      num = `${number}`;
    }
    this.totalNumber = num;
  }
  setDot(number: any) {
    if (this.totalNumber.split('.').length < 2) {
      this.totalNumber = this.totalNumber + number;
    }
  }
  fullNumber(number: any) {
    let total = parseFloat(this.totalNumber) + parseFloat(number);
    this.totalNumber = total.toString();
  }
  fullNumberAll() {
    this.totalNumber = '500';
  }
  remove() {
    // console.log(this.totalNumber.length);
    if (this.totalNumber.length == 1) {
      this.totalNumber = '0';
    } else {
      this.totalNumber = this.totalNumber.slice(0, -1);
    }
  }
  clear() {
    this.totalNumber = '0';
  }
}
