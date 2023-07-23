import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { BlogEntriesPagable } from 'src/app/models/blog-entry.interface';
import { User } from 'src/app/models/user.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  );

  blogEntries$: Observable<BlogEntriesPagable> = this.userId$.pipe(
    switchMap((userId: number) =>
      this.blogService.indexAllBlogEntryByUserName(userId, 1, 3)
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private blogService: BlogService
  ) {}

  onPaginateChange(event: PageEvent) {
    return this.userId$
      .pipe(
        tap(
          (userId: number) =>
            (this.blogEntries$ = this.blogService.indexAllBlogEntryByUserName(
              userId,
              event.pageIndex,
              event.pageSize
            ))
        )
      )
      .subscribe();
  }
}
