import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Admin } from './component/admin/admin';
import { User } from './component/user/user';
import { LifeCycle } from './component/life-cycle/life-cycle';
import { Login } from './component/login/login';
import { Layout } from './component/layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'lifeCycle', component: LifeCycle },
      { path: 'admin', component: Admin },
      { path: 'user', component: User },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
