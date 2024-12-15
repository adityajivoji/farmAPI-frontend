import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule], // Include ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      username: '',
      password: ''
    });
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.http.post('http://127.0.0.1/register/admin', this.form.getRawValue())
    .subscribe(() => {
      this.router.navigate(['/login'])
    });
  }
}
