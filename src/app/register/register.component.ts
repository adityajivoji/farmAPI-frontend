import { HttpClient, HttpClientModule} from '@angular/common/http';
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
      password: '',
      roles: ''
    });
  }

  submit(): void {
    console.log("button clicked");
    // get jwt token stored locally
    const token = localStorage.getItem('jwtToken');

    //creating headers
    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.post('https://13.232.10.107:443/register/user', this.form.getRawValue(), {headers})
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
