import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users:any = [];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private http:HttpClient,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/api/v1/users', { headers })
      .subscribe((data) => {
      this.users = data;
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
       
  }

  editUser(user: any) {
  
    console.log('User:', user);
    this.router.navigate(['/user-update', user._id], { state: { user: user } });
  }

}
