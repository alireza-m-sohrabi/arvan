import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UnauthorizedUtilService {
  constructor(private router: Router) {}

  redirectToLogin() {
    const currentLocation = window.location.pathname + window.location.search;

    this.router.navigate(['/access/login'], {
      queryParams: {
        returnTo: currentLocation,
      },
    });
  }
}
