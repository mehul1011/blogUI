import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User } from '../authentication-service/authentication.service';

export interface UserData {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAllUsers(page: number, limit: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    return this.http.get('/api/user', { params }).pipe(
      map((userData: any) => userData),
      catchError((err) => throwError(() => err))
    );
  }

  paginateByName(
    page: number,
    size: number,
    username: string
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);
    return this.http.get('/api/user', { params }).pipe(
      map((userData: any) => userData),
      catchError((err) => throwError(() => err))
    );
  }

  findOne(id: any): Observable<any | null> {
    if (id) {
      return this.http.get(`/api/user/${id}`).pipe(map((user: User) => user));
    }
    return of(null);
  }

  updateOne(user: any): Observable<User> {
    return this.http.put('/api/user/' + user.id, user);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/user/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
