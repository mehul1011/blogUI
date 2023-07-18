import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_TOKEN = 'blog-token';

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('/api/user/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log(token);
          localStorage.setItem(JWT_TOKEN, token.access_token);
          return token;
        })
      );
  }

  register(user: User) {
    return this.http.post('/api/user', user).pipe(map((user) => user));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_TOKEN);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
