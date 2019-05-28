import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './auth-guard';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: AuthGuard, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
