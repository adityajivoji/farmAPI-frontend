import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';
import { jwtVerify } from 'jose';
@Component({
  selector: 'app-farm',
  imports: [SecondaryNavComponent, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './farm.component.html',
  styleUrl: './farm.component.css'
})
export class FarmComponent implements OnInit {
  farmers: { id: number; name: string; phone: string; language: string }[] = [];
  farms: { id: number; area: string; cropGrown: string; sowingDate: string; village: string; farmerId: number; schedule: number[] }[] = [];
  isLoading = true;
  errorMessage = '';
  selectedFarmerId: number | null = null;
  secretKey: Uint8Array = new TextEncoder().encode('df8e5a7462e5c'); // Same key as used in Flask
    user_role: string | null = null; // Define user_role property

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to access route parameters
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
    // Extract the 'id' parameter from the URL
    this.route.paramMap.subscribe(params => {
      const farmerId = Number(params.get('id')); // Convert to a number
      if (!isNaN(farmerId)) {
        this.fetchFarmsByFarmerId(farmerId); // Fetch farms using the ID
      } else {
        this.errorMessage = 'Invalid farmer ID.';
      }
    });
  }

  fetchFarmsByFarmerId(farmerId: number) {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.isLoading = true;
    this.selectedFarmerId = farmerId;
    this.http.get<any[]>(`http://13.232.10.107:80/list/farms/${farmerId}`, { headers })
      .subscribe({
        next: (data) => {
          this.farms = data.map(farm => ({
            id: farm.id,
            area: farm.area,
            cropGrown: farm.crop_grown,
            sowingDate: new Date(farm.sowing_date).toLocaleDateString(),
            village: farm.village,
            farmerId: farm.farmer_id,
            schedule: farm.schedule.map((s: { id: number; }) => s.id) // Extracting the id values from the schedule array
          }));
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load farms data.';
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  goToSchedulePage(scheduleId: number) {
    this.router.navigate([`/schedule/${scheduleId}`]);
  }

  addSchedule(farmId: number) {
    this.router.navigate([`/add-schedule/${farmId}`]);
  }
}
