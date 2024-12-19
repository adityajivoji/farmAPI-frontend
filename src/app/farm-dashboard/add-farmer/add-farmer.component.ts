import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-add-farmer',
  standalone: true,
  imports: [SecondaryNavComponent, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: "",
      phone: "",
      language: ""
    });
  }

  submit(): void {
    console.log("button clicked");
    const token = localStorage.getItem('jwtToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.post('http://13.232.10.107:80/add/farmer', this.form.getRawValue(), { headers })
      .subscribe((res: any) => {
        console.log(res);
        alert('Farmer added successfully!!!');
        this.router.navigate(['/list-farmers']);
      },
      (err: any) => {
        console.error(err);
        alert('Failed to add farmer. Please try again.');
      }
      );
  }
  cancel() {
    this.router.navigate(['/farm-dashboard']); // Navigate back to the dashboard
  }
}
