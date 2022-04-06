import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  submitted = false;
  attribute: any;
  imageSrc: string = '';

  productForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    file: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    categorys: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    units: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    barcode_code: new FormControl(''),
    cost_discount_price: new FormControl(''),
    min_stock: new FormControl('', Validators.required),
    enable_rounding: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.productForm = this.formBuilder.group({
    //   image: ['', Validators.required],
    //   brand: ['', Validators.required],
    //   name: ['', Validators.required],
    //   detail: ['', Validators.required],
    //   cost: ['', Validators.required],
    //   price: ['', Validators.required],
    //   categorys: ['', Validators.required],
    //   stock: ['', Validators.required],
    //   units: ['', Validators.required],
    //   weight: ['', Validators.required],
    //   barcode_code: [''],
    //   cost_discount_price: [''],
    //   min_stock: ['', Validators.required],
    //   enable_rounding: [''],
    // });

    this.productForm.patchValue({
      name: 'test',
      brand: '6247d9d6402f7abfaea473fc',
      categorys: '6247d62a5fd82f5908f840e8',
      units: '6247db8e12972514b954c64d',
      brands: '',
      detail: 'test',
      cost: 50,
      price: 100,
      stock: 10,
      weight: 10.5,
      barcode_code: '1212312121',
      cost_discount_price: '',
      min_stock: 5,
      enable_rounding: false,
    });

    this.getAttribute();
  }
  getAttribute() {
    this.productService.getAttribute().subscribe({
      next: (response) => {
        console.log(response);
        this.attribute = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.productForm.patchValue({
          image: reader.result,
        });
      };
    }
  }
  onSubmit() {
    console.warn(this.productForm.value);
    const formData = new FormData();
    for (let i of Object.keys(this.productForm.value)) {
      formData.append(i, this.productForm.value[i]);
    }
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'บันทึกรายการสินค้าสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigateByUrl('/product');
        }, 1500);
      },
      error: (error) => console.error(error),
    });
  }
}
