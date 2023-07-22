import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPagable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss'],
})
export class AllBlogEntriesComponent {
  dataSource: Observable<BlogEntriesPagable> = this.blogService.indexAll(1, 1);
  pageEvent!: PageEvent;

  constructor(private blogService: BlogService) {}

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let limit = event.pageSize;
    page += 1;
    this.dataSource = this.blogService.indexAll(page, limit);
  }
}
