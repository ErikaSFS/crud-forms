import { Injectable } from '@angular/core';
import { environment } from 'src/environment/enviroment-example';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  public getAuth(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const options = {
      headers: headers,
    };

    const body = new URLSearchParams();
    body.set('grant_type', environment.GRANT_TYPE);
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);
    body.set('scope', environment.SCOPE);
    body.set('username', username);
    body.set('password', password);

    return this.http.post(environment.AUTH_URL, body, options);
  }

  public  refreshToken(refresh_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const options = {
      headers: headers,
    };

    const body = new URLSearchParams();
    body.set('grant_type', environment.GRANT_TYPE_REFRESH_TOKEN);
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);
    body.set('scope', environment.SCOPE);
    body.set('refresh_token', refresh_token);

    return this.http.post(environment.AUTH_URL, body, options);
  }
}
