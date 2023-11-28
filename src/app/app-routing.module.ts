import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { signupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './Customer-dashboard/Customer-dashboard.component'
import { ViewitemsComponent } from './viewitems/viewitems.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { aboutComponent } from './about/about.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { BookComponent } from './book/book.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { SuccessComponent } from './success/success.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { MenuComponent } from './menu/menu.component';
import { PaymentComponent } from './payment/payment.component';
import { OtpComponent } from './otp/otp.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PmedicationComponent } from './pmedication/pmedication.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PatientReportComponent } from './patient-report/patient-report.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [

  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent,canActivate : [AuthGuard]},
   {path:"signup",component:signupComponent},
   {path:"customerDashboard",component:CustomerDashboardComponent, canActivate : [AuthGuard]},
   {path:"adminDashboard",component:AdminDashboardComponent,canActivate : [AuthGuard]},
   {path:"viewitems",component:ViewitemsComponent,canActivate : [AuthGuard]},
   {path:"ContactUs", component:ContactUsComponent},
   {path:"about", component:aboutComponent},
   {path:"ViewAppointment",component:ViewAppointmentComponent,canActivate : [AuthGuard]},
  {path:"book",component:BookComponent,canActivate : [AuthGuard]},
  {path:"doctordetails",component:DoctorDetailsComponent,canActivate : [AuthGuard]},
  {path:"success",component:SuccessComponent},
{path:"search-filter",component:SearchFilterComponent,canActivate : [AuthGuard]},
{path:"feedback-form",component:FeedbackFormComponent},
{path:"patient-dashboard",component:PatientDashboardComponent,canActivate : [AuthGuard]},
{path:"add-doctor",component:AddDoctorComponent},
{path:"menu",component:MenuComponent,canActivate : [AuthGuard]},
{path:"payment",component:PaymentComponent,canActivate : [AuthGuard]},
{path:"otp",component:OtpComponent,canActivate : [AuthGuard]},
{path:"prescription",component:PrescriptionComponent},
{path:"pmedication",component:PmedicationComponent},
{path:"view-profile",component:ViewProfileComponent,canActivate : [AuthGuard]},
{ path: 'edit-profile', component: EditProfileComponent },
{ path: 'edit-profile/:user_id', component: EditProfileComponent },
{path:'**',component:NotfoundComponent},
{path:'patient-report',component:PatientReportComponent,canActivate : [AuthGuard]},
{
  path: 'view-profile/:user_id',
  component: ViewProfileComponent
},
{path:'user-appointment/:user_id',component:UserAppointmentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
