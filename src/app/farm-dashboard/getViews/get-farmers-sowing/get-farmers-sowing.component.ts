import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-farmers-sowing',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './get-farmers-sowing.component.html',
  styleUrls: ['./get-farmers-sowing.component.css']
})
export class GetFarmersSowingComponent implements OnInit {
  farmers: { id: number; name: string }[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchFarmers();
  }

  fetchFarmers() {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.http.get<any[]>("http://127.0.0.1:80/get_view/all_farmer_growing_crop", { headers })
      .subscribe({
        next: (data) => {
          this.farmers = data.map(farmer => ({ id: farmer[0], name: farmer[1] }));
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load farmers data.';
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  goToFarmerPage(id: number) {
    this.router.navigate([`/farmer/${id}`]);
  }
}