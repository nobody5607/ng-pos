import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  @Output() toggleClick = new EventEmitter<any>();
  show = false;
  ngOnInit(): void {}
  totalClick() {
    const toggle = !this.show;
    this.toggleClick.emit(toggle);
    this.show = toggle;
  }
}
