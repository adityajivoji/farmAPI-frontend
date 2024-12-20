import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';
import { jwtVerify } from 'jose';
@Component({
  selector: 'app-farmer',
  imports: [SecondaryNavComponent, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './farmer.component.html',
  styleUrl: './farmer.component.css'
})
export class FarmerComponent implements OnInit {
  farmer: { id: number; name: string; phone: string; language: string; farms: any[] } | null = null;
  isLoading = true;
  errorMessage = '';
  secretKey: Uint8Array = new TextEncoder().encode('df8e5a7462e5c'); // Same key as used in Flask
    user_role: string | null = null; // Define user_role property

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute // For accessing route parameters
  ) {this.initializeUserRole();}
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
  ngOnInit() {
    // Extract the farmer ID from the URL and fetch the farmer's details
    this.route.paramMap.subscribe(params => {
      const farmerId = Number(params.get('id')); // Get farmer ID from URL
      if (!isNaN(farmerId)) {
        this.fetchFarmerDetails(farmerId);
      } else {
        this.errorMessage = 'Invalid farmer ID.';
        this.isLoading = false;
      }
    });
  }

  // Fetch farmer details using the provided API
  fetchFarmerDetails(farmerId: number) {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.isLoading = true;
    this.http.get<any>(`http://13.232.10.107:80/get/farmer/${farmerId}`, { headers }).subscribe({
      next: (data) => {
        interface Farm {
          id: number;
          area: number;
          cropGrown: string;
          sowingDate: string;
          village: string;
        }

        interface Farmer {
          id: number;
          name: string;
          phone: string;
          language: string;
          farms: Farm[];
        }

        this.farmer = {
          id: data.id,
          name: data.name,
          phone: data.phone,
          language: data.language,
          farms: data.farms.map((farm: any): Farm => ({
            id: farm.id,
            area: farm.area,
            cropGrown: farm.crop_grown,
            sowingDate: new Date(farm.sowing_date).toLocaleDateString(),
            village: farm.village
          }))
        };
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load farmer details.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  // Navigate to farm details page
  goToFarmDetails(farmId: number) {
    this.router.navigate([`/farm/${farmId}`]);
  }

  goToFarmPage(id: number) {
    this.router.navigate([`/farm/${id}`]);
  }
}
