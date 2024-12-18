import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-farmer',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
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

    this.http.post('http://127.0.0.1:80/add/farmer', this.form.getRawValue(), { headers })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
