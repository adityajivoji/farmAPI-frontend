import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/authEmitter';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        username: '',
        password: ''

      })
  }

  submit(): void {

    console.log("button clicked");

  this.http.post('http://13.232.10.107:80/login', this.form.getRawValue())
    .subscribe((res: any) => {

      // Extract the token from the response
      const token = res[0]?.access_token;
      if (token) {
        localStorage.setItem('jwtToken', token); // Store token in localStorage

        Emitters.authEmitter.emit(true);
        this.router.navigate(['/farm-dashboard']);
      } else {
        Emitters.authEmitter.emit(false);
        console.error('Token not found in response');
        // refresh login page
        this.router.navigate(['/login']);
      }
    });
  }
  
  

}
