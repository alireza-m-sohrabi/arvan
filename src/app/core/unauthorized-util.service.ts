import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UnauthorizedUtilService {
  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/access/login']);
  }
}
