import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { BlogEntriesPagable } from 'src/app/models/blog-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  indexAll(page: number, size: number): Observable<BlogEntriesPagable> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http
      .get<BlogEntriesPagable>('/api/blog-entries', { params })
      .pipe(
        map((blogEntriesPagable: BlogEntriesPagable) => blogEntriesPagable),
        catchError((err) => throwError(() => err.message))
      );
  }
}
