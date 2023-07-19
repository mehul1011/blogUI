import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string = 'blog-token';

  public get token(): string {
    return this._token;
  }
}
