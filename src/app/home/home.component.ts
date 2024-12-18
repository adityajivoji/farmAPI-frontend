import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Emitters } from '../emitters/authEmitter';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent implements OnInit  {
  isLoggedIn: boolean = false;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
          this.isLoggedIn = auth;
        });
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.router.navigate(['/farm-dashboard']);
    }
  }

  checkLoginStatus(): void {
    // Check if the JWT token exists in localStorage
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }
}
