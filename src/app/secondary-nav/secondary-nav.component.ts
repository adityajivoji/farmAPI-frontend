import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Emitters } from '../emitters/authEmitter';
import { jwtVerify } from 'jose';

@Component({
  selector: 'app-secondary-nav',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.css',
  standalone: true,
})
export class SecondaryNavComponent {
  secretKey: Uint8Array = new TextEncoder().encode('df8e5a7462e5c');
  user_role: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  async verifyJWT(token: string): Promise<any> {
    try {
        // Verify the token
        const { payload } = await jwtVerify(token, this.secretKey);

        console.log('Decoded Payload:', payload);
        return payload; // Contains identity and roles
    } catch (err: any) {
        console.error('Invalid Token:', err.message);
        return null;
    }
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isLoggedIn = auth;
    });
    this.initializeUserRole();
  }

  async initializeUserRole() {
    const token = localStorage.getItem('jwtToken') || '';
    const payload = await this.verifyJWT(token);
    if (payload) {
      const roles = payload.roles;
      if (roles.includes('superadmin')) {
        this.user_role = 'superadmin';
      } else if (roles.includes('admin')) {
        this.user_role = 'admin';
      } else {
        this.user_role = 'user';
      }
    }
    console.log('User Role:', this.user_role);
  }

  navigateToDashboard() {
    this.router.navigate(['/farm-dashboard']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToCreateFarmer() {
    this.router.navigate(['/add-farmer']);
  }

  navigateToListFarmers() {
    this.router.navigate(['/list-farmers']);
  }

  navigateToFarmersSowing() {
    this.router.navigate(['/farmers-sowing']);
  }

  navigateToDueTodayTomorrow() {
    this.router.navigate(['/due-today-tomorrow']);
  }


}
