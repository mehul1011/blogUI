import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogEntriesPagable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss'],
})
export class AllBlogEntriesComponent {
  // dataSource: Observable<BlogEntriesPagable> = this.blogService.indexAll(1, 1);
  pageEvent!: PageEvent;

  @Input() blogEntries: BlogEntriesPagable | undefined;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor(private router: Router) {}

  onPaginateChange(event: PageEvent) {
    event.pageIndex += 1;
    // let limit = event.pageSize;
    // page += 1;
    this.paginate.emit(event);
    // this.dataSource = this.blogService.indexAll(page, limit);
  }

  navigate(id: number | undefined) {
    if (id) {
      this.router.navigateByUrl('blog-entries/' + id);
    }
  }
}
