import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStore } from '../../store/user.store';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  private auth: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public auths: Observable<string> = this.auth.asObservable();



  constructor(private httpService: HttpService, 
    private $user: UserStore,
    private router: Router) { }

  public setAuth(value: string): void {
    this.auth.next(value);
  }


  public renewToken(): void {
    const refreshToken = sessionStorage.getItem('refresh_token');

    if (refreshToken) {
      this.httpService.refreshToken(refreshToken).subscribe({
        next: (response) => {
          this.setAuth(response.access_token);
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('refresh_token', response.refresh_token);
        },
      });
    }
  }

  public login(username: string, password: string): void {
    this.httpService.getAuth(username, password).subscribe({
      next: (response) => {
        this.$user.setUser(username);
        this.setAuth(response.access_token);
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
        this.router.navigate(['/internal']);
      },
    });
  }
}
