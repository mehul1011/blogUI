import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { BlogEntry } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss'],
})
export class ViewBlogEntryComponent {
  // $ is naming convention to identify that variable is a Observable
  blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const blogEntyID: number = parseInt(params['id']);
      return this.blogService.findOne(blogEntyID).pipe(
        map((blogEntry: BlogEntry) => {
          return blogEntry;
        })
      );
    })
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}
}
