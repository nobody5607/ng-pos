import { Component, OnInit } from '@angular/core';
declare var window: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  formModal: any;
  constructor() {}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  selectProduct() {
    console.log('ok');
  }
  counter(i: number) {
    return new Array(i);
  }
  checkout() {
    this.formModal.show();
  }
}
