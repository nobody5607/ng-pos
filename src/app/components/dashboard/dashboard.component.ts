import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  userLogin: any;
  ngOnInit(): void {
    this.getEnv();
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }
    this.userLogin = localStorage.getItem('user');
    this.userLogin = JSON.parse(this.userLogin);
  }
  getEnv(): void {
    console.log(environment.API_URL);
  }
}
