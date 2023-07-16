import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('/api/user/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log(token);
          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }

  register(user: User) {
    return this.http.post('/api/user', user).pipe(map((user) => user));
  }
}
