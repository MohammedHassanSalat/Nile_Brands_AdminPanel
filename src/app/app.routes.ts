import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { DashboardComponent } from './components/adminpanel/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'verifyemail', component: VerifyemailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // children: [

    // ],
  },
];
