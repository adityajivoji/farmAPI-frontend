import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';
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
