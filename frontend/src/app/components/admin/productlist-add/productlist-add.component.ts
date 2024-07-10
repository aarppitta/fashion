import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist-add',
  templateUrl: './productlist-add.component.html',
  styleUrls: ['./productlist-add.component.css']
})
export class ProductlistAddComponent implements OnInit {

  form!:FormGroup;
  image!: File;
  imageUrl!:string;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      description :['', Validators.required],
      price:['', Validators.required],
      richDescription:['', Validators.required],
      image:[''],
      stock:['', Validators.required],
      isFeatured:['', Validators.required],
    });
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }
  addProduct(){


    if(this.form.valid){
      const formData = new FormData();
      

      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });
      if(this.image){
        formData.append('image', this.image);
      }

      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/login']);
      }

      const headers = { Authorization: `Bearer  ${token}` };


      this.http.post('http://localhost:3000/api/v1/products', formData, { headers:headers })
        .subscribe(
          (result: any) => {
            console.log('Product added successfully', result);
            this.imageUrl = result.image;
            this.router.navigate(['/productlist']);
          },
          err => {
            console.log('Error while adding product',err);
    })
  }
}

}
