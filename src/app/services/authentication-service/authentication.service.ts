import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.interface';

export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_TOKEN = 'blog-token';

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

  logout() {
    localStorage.removeItem(JWT_TOKEN);
  }

  register(user: User) {
    return this.http.post('/api/user', user).pipe(map((user) => user));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_TOKEN);
    console.log(this.getUserId());

    if (token && token !== 'undefined') {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getUserId(): Observable<number | null> {
    const jwt = localStorage.getItem(JWT_TOKEN);
    if (jwt && jwt !== 'undefined') {
      const token = this.jwtHelper.decodeToken(jwt);
      return of(token.user.id);
    } else {
      return of(null);
    }

    // if (!jwt) {
    //   return of(null);
    // }

    // return from(this.jwtHelper.decodeToken()).pipe(
    //   tap((decodedToken) => console.log(decodedToken)),
    //   map((jwt) => {
    //     if (jwt && jwt.user) {
    //       jwt?.user?.id;
    //     }
    //   })
    // );
  }

  // getUserId(): Observable<number | null> {
  //   return of(localStorage.getItem(JWT_TOKEN)).pipe(
  //     switchMap((jwt: string | null) => {
  //       if (!jwt) {
  //         return of(null);
  //       }
  //       return of(this.jwtHelper.decodeToken()).pipe(
  //         tap((jwt) => console.log(jwt)),
  //         map((jwt) => jwt?.user?.id ?? null)
  //       );
  //     })
  //   );
  // }
}
