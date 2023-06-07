import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserStore } from '../../store/user.store';
import { ToasterService } from '../toaster/toaster.service';

@Injectable()
export class AuthService {
  private auth: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public auths: Observable<string> = this.auth.asObservable();

  constructor(
    private tokenService: TokenService,
    private $user: UserStore,
    private router: Router,
    private toaster: ToasterService,
  ) {}

  public setAuth(value: string): void {
    this.auth.next(value);
  }

  public renewToken(): void {
    const refreshToken = sessionStorage.getItem('refresh_token');

    sessionStorage.clear();

    if (refreshToken) {
      this.tokenService.refreshToken(refreshToken).subscribe({
        next: (response) => {
          this.setAuth(response.access_token);
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('refresh_token', response.refresh_token);
        },
      });
    }
  }

  public login(username: string, password: string): void {
    this.tokenService.getAuth(username, password).subscribe({
      next: (response) => {
        this.setUserName();
        this.setAuth(response.access_token);
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
        this.router.navigate(['/internal']);
        this.toaster.showSuccess('Login efetuado com sucesso.');
      },
      error: (error: any) => {
        if (error.status === 404 || error.status === 400) {
          this.toaster.showDanger(
            'Ops, algo de errado aconteceu. Tente novamente mais tarde.'
          );
        }

        if (error.status === 401 || error.status === 403) {
          this.toaster.showDanger(
            'Usuário ou senha incorretos.'
          );
          this.renewToken();
        }
      },
    });
  }

  public logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/external']);
  }

  public setUserName(): void {
    const token = sessionStorage.getItem('access_token') as string;
    if (token) {
      const helper = new JwtHelperService();
      const {
        authorities,
        given_name,
        groups,
        name,
        preferred_username,
        scope,
      } = helper.decodeToken(token);

      this.$user.setUser({
        authorities,
        given_name,
        groups,
        name,
        preferred_username,
        scope,
      });
    }
  }
}