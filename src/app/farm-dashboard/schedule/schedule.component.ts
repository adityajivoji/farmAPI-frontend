import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-schedule',
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{
  schedule: { id: number; quantity: number; quantity_unit: string; fertilizer: string; days_after_sowing: number } | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute // For accessing route parameters
  ) {}

  ngOnInit() {
    // Extract the schedule ID from the URL and fetch the schedule's details
    this.route.paramMap.subscribe(params => {
      const schedule_id = Number(params.get('id')); // Get schedule ID from URL
      if (!isNaN(schedule_id)) {
        this.fetchScheduleDetails(schedule_id);
      } else {
        this.errorMessage = 'Invalid schedule ID.';
        this.isLoading = false;
      }
    });
  }

  // Fetch schedule details using the provided API
  fetchScheduleDetails(schedule_id: number) {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.isLoading = true;
    this.http.get<any>(`http://13.232.10.107:80/get/schedules/${schedule_id}`, { headers }).subscribe({
      next: (data) => {
        this.schedule = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load schedule details.';
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
