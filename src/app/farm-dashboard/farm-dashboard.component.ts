import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { jwtVerify } from 'jose';
@Component({
  selector: 'app-farm-dashboard',
  imports: [RouterModule, CommonModule, MatCardModule],
  templateUrl: './farm-dashboard.component.html',
  styleUrl: './farm-dashboard.component.css'
})
export class FarmDashboardComponent {
  secretKey: Uint8Array = new TextEncoder().encode('df8e5a7462e5c'); // Same key as used in Flask
    user_role: string | null = null; // Define user_role property
  
    constructor(private router: Router) {
      this.initializeUserRole();
    }
  
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
    createFarmer():void {
      this.router.navigate(['/add-farmer'])
    }
    getFarmersSowing():void {
      this.router.navigate(['/farmers-sowing']) 
    }
    getDueTodayTomorrow():void {
      this.router.navigate(['/due-today-tomorrow'])
    }
    listFarmers():void {
      this.router.navigate(['/list-farmers'])
    }

    getRegisterPage():void {
      this.router.navigate(['/register'])
    }
    
    
}
