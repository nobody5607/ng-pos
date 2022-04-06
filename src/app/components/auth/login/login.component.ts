import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  username: string = 'cn2022@gmail.com';
  password: string = 'Cn2022';
  validate_message: string = '';
  auth: any;

  validateFunc() {
    if (this.username === '') {
      this.validate_message = 'กรุณากรอก Email';
    }
    if (this.password === '') {
      this.validate_message = 'กรุณากรอก Password';
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  submit() {
    this.validateFunc();
    if (this.username !== '' && this.password !== '') {
      this.validate_message = '';
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.auth = response;
          localStorage.setItem('access_token', this.auth.token);
          localStorage.setItem('user', JSON.stringify(this.auth.data));
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
