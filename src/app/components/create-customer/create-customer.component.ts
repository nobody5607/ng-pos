import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  @Output() selectMemberIdOnRegister = new EventEmitter<string>();
  submitted = false;
  customer_id: string = '';
  member_id: string = '';
  customer_form: FormGroup = new FormGroup({
    member_id: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');
    if (id) {
      this.getCustomerByid(id);
    }

    this.customer_form.patchValue({
      member_id: '12123',
      firstname: 'Nuttaphon ',
      lastname: 'Chanpan',
      sex: 'male',
      phone: '0953046095',
    });
  }
  getCustomerByid(id: any) {
    this.customerService.getCustomerById(id).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.customer_id = id;
          this.member_id = response.data.member_id;
          this.customer_form.patchValue({
            member_id: response.data.member_id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            sex: response.data.sex,
            phone: response.data.phone,
          });
        }
      },
      error: (error) => console.log(error),
    });
  }
  onSubmit() {
    let formData = new FormData();
    let data = this.customer_form.value;
    if (this.member_id != '') {
      //not edit on update customer
      data.member_id = this.member_id;
    }
    formData.append('data', JSON.stringify(data));
    this.customerService.createCustomer(formData, this.customer_id).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'บันทึสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
          this.clear();
          this.selectMemberIdOnRegister.emit(data.member_id);

          // setTimeout(() => {
          //   this.router.navigateByUrl('/customer');
          // }, 1500);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: response.message,
            showConfirmButton: true,
          });
        }
      },
      error: (error) => console.error(error),
    });
  }

  clear() {
    this.customer_form.patchValue({
      member_id: '',
      firstname: '',
      lastname: '',
      sex: '',
      phone: '',
    });
  }
}
