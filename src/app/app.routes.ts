import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FarmDashboardComponent } from './farm-dashboard/farm-dashboard.component';
import { GetFarmersSowingComponent } from './farm-dashboard/getViews/get-farmers-sowing/get-farmers-sowing.component';
import { GetTodayTomorrowComponent } from './farm-dashboard/getViews/get-today-tomorrow/get-today-tomorrow.component';
import { FarmerComponent } from './farm-dashboard/farmer/farmer.component';
import { FarmComponent } from './farm-dashboard/farm/farm.component';
import { FarmerListComponent } from './farm-dashboard/farmer-list/farmer-list.component';
import { ScheduleComponent } from './farm-dashboard/schedule/schedule.component';
import { AddFarmerComponent } from './farm-dashboard/add-farmer/add-farmer.component';
import { AddFarmComponent } from './farm-dashboard/add-farm/add-farm.component';
import { AddScheduleComponent } from './farm-dashboard/add-schedule/add-schedule.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'farm-dashboard', component: FarmDashboardComponent},
    {path:'farmers-sowing', component: GetFarmersSowingComponent},
    {path:'due-today-tomorrow', component: GetTodayTomorrowComponent},
    {path:'farmer/:id', component: FarmerComponent},
    {path:'list-farmers', component: FarmerListComponent},
    {path:'farm/:id', component: FarmComponent},
    {path:'schedule/:id', component: ScheduleComponent},
    {path:'add-farmer', component: AddFarmerComponent},
    {path:'add-farm/:id', component: AddFarmComponent},
    {path:'add-schedule/:id', component:AddScheduleComponent}

];
