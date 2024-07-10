import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist-add',
  templateUrl: './userlist-add.component.html',
  styleUrls: ['./userlist-add.component.css']
})
export class UserlistAddComponent implements OnInit {

  form!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient, 
    private router:Router
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: '',
      email: '',
      passwordHash: '',
      isAdmin: ''
    });
  }

  addUser(){
    if(this.form.valid){
      const user = this.form.getRawValue();
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/login']);
      }
  
      const headers = { Authorization: `Bearer ${token}` };

      this.http.post<any>('http://localhost:3000/api/v1/users/register', user, { headers })
        .subscribe((data) => {
          console.log('Data added successfully', data);
          this.router.navigate(['/userlist']);
        }, (error) => {
          console.error('Error adding data', error);
        });
      }
  }

}
