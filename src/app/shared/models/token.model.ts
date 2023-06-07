export class TokenModel {
    access_token: string = '';
    refresh_token: string = '';
    expires_in: number = 0;
    refresh_expires_in: number = 0;
    scope: string = '';
    session_state: string = '';
    token_type: string = '';
  }
