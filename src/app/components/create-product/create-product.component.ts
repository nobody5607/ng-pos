import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  image_src: string = '';
  product_id: string = '';
  response: any;

  product_form: FormGroup = new FormGroup({
    image: new FormControl(''),
    file: new FormControl(''),
    brand: new FormControl('', Validators.required),
    product_id: new FormControl('', Validators.required),
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
    enable_rounding: new FormControl(false),
  });

  constructor(
    // private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');
    if (id) {
      this.product_id = id.toString();
      this.getProductById(id);
    }

    // this.product_form.patchValue({
    //   name: 'test',
    //   brand: '6247d9d6402f7abfaea473fc',
    //   categorys: '6247d62a5fd82f5908f840e8',
    //   units: '6247db8e12972514b954c64d',
    //   brands: '',
    //   detail: 'test',
    //   cost: 50,
    //   price: 100,
    //   stock: 10,
    //   weight: 10.5,
    //   barcode_code: '1212312121',
    //   cost_discount_price: '',
    //   min_stock: 5,
    //   enable_rounding: false,
    // });

    this.getAttribute();
  }
  getProductById(id: any) {
    this.productService.getProductById(id).subscribe({
      next: (p) => {
        this.product_form.patchValue({
          name: p.name,
          product_id: p.product_id,
          brand: p.brand._id,
          categorys: p.categorys._id,
          units: p.units._id,
          detail: p.detail ? p.detail : '',
          cost: p.cost,
          price: p.price,
          stock: p.stock,
          weight: p.weight,
          barcode_code: p.barcode_code,
          cost_discount_price: p.cost_discount_price,
          min_stock: p.min_stock,
          enable_rounding: p.enable_rounding ? p.enable_rounding : false,
        });
        this.image_src = p.image;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
    return this.product_form.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.product_form.reset();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image_src = reader.result as string;
        this.product_form.patchValue({
          image: event.target.files[0],
        });
      };
    }
  }
  onSubmit() {
    console.warn(this.product_form.value);
    const formData = new FormData();
    for (let i of Object.keys(this.product_form.value)) {
      if (i === 'image' && this.product_form.value[i] == '') {
        continue;
      }
      formData.append(i, this.product_form.value[i]);
    }
    if (this.product_id) {
      formData.append('id', this.product_id);
    }
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        this.response = response;
        if (this.response.errors) {
          console.log(this.response.message);
        } else {
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
        }
        ///if(response.errors)
      },
      error: (error) => console.error(error),
    });
  }
}
