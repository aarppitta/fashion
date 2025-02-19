import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNotification = false;
  notificationCount!: number;
  isLoggedIn = false;

  constructor(private http: HttpClient, private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this.cartService.currentNotificationCount.subscribe(count => this.notificationCount = count);
    this.cartService.showNotification.subscribe(show => this.showNotification = show);
    this.cartService.getCartItems();
    localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    // Optionally, redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
