import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-add-farm',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule, SecondaryNavComponent],
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css']
})
export class AddFarmComponent implements OnInit {
  form!: FormGroup;
  farmerId!: number; // Define farmerId as a class property

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract farmer ID from route parameters
    this.route.paramMap.subscribe(params => {
      this.farmerId = Number(params.get('id'));
    });

    // Initialize the form
    this.form = this.formBuilder.group({
      area: [''],
      crop_grown: [''],
      sowing_date: [''],
      village: ['']
    });
  }

  submit(): void {
    console.log('Button clicked');
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No JWT token found in localStorage');
      return;
    }

    // Create headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Log request data
    console.log('Request payload:', this.form.getRawValue());

    // Make the HTTP POST request
    this.http
      .post(`http://13.232.10.107:80/add/farm/${this.farmerId}`, this.form.getRawValue(), { headers })
      .subscribe(
        res => {
          console.log('Response:', res);
          alert('Farm added successfully!!!');
          this.router.navigate([`/farm/${this.farmerId}`]);
        },
        error => {
          console.error('Error occurred:', error);
          alert('Failed to add farm. Please try again.');
        }
      );
  }
  cancel() {
    this.router.navigate([`/list-farmers`]);
  }
}
