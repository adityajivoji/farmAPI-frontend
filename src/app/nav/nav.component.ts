import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Emitters } from '../emitters/authEmitter';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
})
export class NavComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isLoggedIn = auth;
    });
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    // Check if the JWT token exists in localStorage
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    const token = localStorage.getItem('jwtToken');
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false; // Update the status
    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    Emitters.authEmitter.emit(false);
    // Call the logout API
    this.http.post('http://13.232.10.107:80/logout',{}, {headers}).subscribe(
      () => {
        // Remove the token from localStorage
        
        
        this.router.navigate(['/']); // Redirect to Home
      },
      (error) => {
        this.router.navigate(['/farm-dashboard'])
        console.error('Logout failed', error);
      }
    );
    this.router.navigate(['/login'])
  }
  goHomePage():void {
    this.router.navigate(['/'])
  }
  goFarmDashboard():void {
    this.router.navigate(['/farm-dashboard'])
  }
  navLogin():void {
    this.router.navigate(['/login'])
  }

}
