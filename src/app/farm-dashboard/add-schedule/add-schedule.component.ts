import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SecondaryNavComponent } from '../../secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-add-schedule',
  imports: [SecondaryNavComponent, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.css'
})
export class AddScheduleComponent {
    form!: FormGroup;
    farmId!: number;
    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.farmId = Number(params.get('id'));
      });
      this.form = this.formBuilder.group({
        days_after_sowing:'',
        quantity:'',
        fertilizer:"",
        quantity_unit:""
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
  
      this.http.post(`http://13.232.10.107:80/add/schedule/${this.farmId}`, this.form.getRawValue(), {headers})
        .subscribe((res: any) => {
          console.log(res);
          alert('Farm added successfully!!!');
          this.router.navigate([`/list-farmers`]);
        });
    }
    cancel() {
      this.router.navigate([`/list-farmers`]);
    }

}
