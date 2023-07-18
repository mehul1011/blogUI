import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_TOKEN } from '../services/authentication-service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT_TOKEN);
    if (token) {
      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(cloneRequest, 1);
      return next.handle(cloneRequest); // same original req + Bearer token
    } else {
      return next.handle(request);
    }
  }
}
