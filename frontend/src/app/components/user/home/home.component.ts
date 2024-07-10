import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:any = [];
  constructor(private http: HttpClient , private cartService:CartService , private router:Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/v1/products')
    .subscribe((product)=>{
      this.products = product;
    },(e)=>{
      console.log(e);
    }
    )
  }

}
