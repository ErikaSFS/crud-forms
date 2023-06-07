import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class NoAuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');

    if (!token && !refreshToken) {
      return true;
    } else if (refreshToken && !token) {
      this.auth.renewToken();
      this.router.navigate(['/initial']);
      return false;
    } else {
      this.router.navigate(['/initial']);
      return false;
    }
  }
}