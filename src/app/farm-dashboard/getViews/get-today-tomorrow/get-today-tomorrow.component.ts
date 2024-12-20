import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SecondaryNavComponent } from '../../../secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-get-today-tomorrow',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, SecondaryNavComponent],
  templateUrl: './get-today-tomorrow.component.html',
  styleUrls: ['./get-today-tomorrow.component.css']
})
export class GetTodayTomorrowComponent implements OnInit {
  schedules: { date: string; farmId: number; scheduleId: number }[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSchedules();
  }
  

  fetchSchedules() {
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.http.get<any[]>("http://13.232.10.107:80/get_view/todaytomorrow", { headers })
      .subscribe({
        next: (data) => {
          this.schedules = data.map(item => ({ 
            date: new Date(item.Date).toLocaleDateString(), 
            farmId: item["Farm Id"], 
            scheduleId: item["Schedule Id"] 
          }));
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load schedule data.';
          console.error(error);
          this.isLoading = false;
        }
      });
  }
}