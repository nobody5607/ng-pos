import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'posts';
  formModal: any;
  mySidebar: any;
  myContent: any;
  ngOnInit(): void {}
  openNav() {
    this.mySidebar = 'width:150px;';
    this.myContent = 'margin-left:150px;';
  }
  closeNav() {
    this.mySidebar = '';
    this.myContent = '';
  }
  toggleClick(toggle: any) {
    if (toggle === true) {
      this.openNav();
    } else {
      this.closeNav();
    }
  }
}
