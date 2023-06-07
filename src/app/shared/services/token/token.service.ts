import { finalize, Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenModel } from '../../models/token.model';

@Injectable()
export class TokenService {
  constructor(private http: HttpClient) {}

  public getAuth(username: string, password: string): Observable<TokenModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const options = {
      headers: headers,
    };

    const body = new URLSearchParams();
    body.set('grant_type', process.env['GRANT_TYPE'] as string);
    body.set('client_id', process.env['CLIENT_ID'] as string);
    body.set('client_secret',process.env['CLIENT_SECRET'] as string);
    body.set('scope', process.env['SCOPE'] as string);
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<TokenModel>(process.env['AUTH_URL'] as string, body, options)
      .pipe(shareReplay());
  }

  public refreshToken(refresh_token: string): Observable<TokenModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const options = {
      headers: headers,
    };

    const body = new URLSearchParams();
    body.set('grant_type', process.env['GRANT_TYPE_REFRESH_TOKEN'] as string);
    body.set('client_id', process.env['CLIENT_ID'] as string);
    body.set('client_secret',process.env['CLIENT_SECRET'] as string);
    body.set('scope', process.env['SCOPE'] as string);
    body.set('refresh_token', refresh_token);

    return this.http.post<TokenModel>(process.env['AUTH_URL'] as string, body, options).pipe(
      shareReplay(),
      finalize(() => {
        window.location.reload();
      })
    );
  }
}