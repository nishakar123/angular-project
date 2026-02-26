import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser || loggedInUser === '' || loggedInUser === null) {
    alert('Please login to access this page.');
    router.navigateByUrl('login');
    return false;
  }
  return true;
};
