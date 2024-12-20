import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';
import { jwtVerify } from 'jose'; 
@Component({
  selector: 'app-farmer-list',
  imports: [RouterModule, CommonModule, HttpClientModule, SecondaryNavComponent],
  templateUrl: './farmer-list.component.html',
  styleUrl: './farmer-list.component.css'
})
export class FarmerListComponent implements OnInit{
  farmers: { id: number; name: string; phone: string; language: string }[] = [];
  isLoading = true;
  errorMessage = '';
  secretKey: Uint8Array = new TextEncoder().encode('df8e5a7462e5c'); // Same key as used in Flask
    user_role: string | null = null; // Define user_role property

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.initializeUserRole();
    this.fetchFarmers();
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

  fetchFarmers() {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.http.get<any[]>("http://13.232.10.107:80/list/farmers", { headers })
      .subscribe({
        next: (data) => {
          this.farmers = data.map(farmer => ({ 
            id: farmer.id, 
            name: farmer.name, 
            phone: farmer.phone, 
            language: farmer.language 
          }));
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load farmers data.';
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  goToFarmPage(id: number) {
    this.router.navigate([`/farm/${id}`]);
  }

  addFarm(id: number) {
    this.router.navigate([`/add-farm/${id}`]);
  }
}
