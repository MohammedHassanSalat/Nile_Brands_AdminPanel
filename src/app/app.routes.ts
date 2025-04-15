import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { DashboardComponent } from './components/adminpanel/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CreateuserComponent } from './components/adminpanel/createuser/createuser.component';
import { ViewusersComponent } from './components/adminpanel/viewusers/viewusers.component';
import { UpdateuserComponent } from './components/adminpanel/updateuser/updateuser.component';
import { ViewfeedbacksComponent } from './components/adminpanel/viewfeedbacks/viewfeedbacks.component';
import { ViewbrandsComponent } from './components/adminpanel/viewbrands/viewbrands.component';
import { ViewproductsComponent } from './components/adminpanel/viewproducts/viewproducts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/viewbrands', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'verifyemail', component: VerifyemailComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      { path: 'createuser', component: CreateuserComponent },
      { path: 'viewusers', component: ViewusersComponent },
      { path: 'updateuser/:id', component: UpdateuserComponent },
      { path: 'viewfeedbacks', component: ViewfeedbacksComponent },
      { path: 'viewbrands', component: ViewbrandsComponent },
      { path: 'viewproducts', component: ViewproductsComponent },
    ],
  },
];
