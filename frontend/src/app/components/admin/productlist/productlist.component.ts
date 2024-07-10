import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products!:any[];
  
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }
    const headers = { 'Authorization': `Bearer ${token}` }

    this.http.get<any[]>(`http://localhost:3000/api/v1/products`,{ headers })
    .subscribe(data => {
      console.log('Data fetched successfully', data);
    }, error => {
      console.log('Error fetching data', error);
    })
  }

}
