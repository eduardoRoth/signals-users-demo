import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/user-list/user-list.component'),
  },
];
