import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  BlogEntriesPagable,
  BlogEntry,
} from 'src/app/models/blog-entry.interface';

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

  postBlog(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>('/api/blog-entries', blogEntry);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(
      '/api/blog-entries/image/upload',
      formData,
      {
        reportProgress: true, // for progressBar UI
        observe: 'events',
      }
    );
  }

  findOne(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>('/api/blog-entries/' + id);
  }

  // api/blog-entries/user/10?page=1&limit=2
  indexAllBlogEntryByUserName(
    userId: number,
    page: number,
    limit: number
  ): Observable<BlogEntriesPagable> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPagable>(
      'api/blog-entries/user/' + String(userId),
      { params }
    );
  }
}
