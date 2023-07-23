import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPagable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  blogEntries$: Observable<BlogEntriesPagable> = this.blogService.indexAll(
    1,
    10
  );
  constructor(private blogService: BlogService) {}
  onPaginateChange(event: PageEvent) {
    this.blogEntries$ = this.blogService.indexAll(
      event.pageIndex,
      event.pageSize
    );
  }
}
