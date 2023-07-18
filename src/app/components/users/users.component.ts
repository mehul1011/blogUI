import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource!: UserData;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  pageEvent!: PageEvent;
  filterValue!: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initDataSource();
  }
  initDataSource() {
    this.userService
      .findAllUsers(1, 1)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue == null || this.filterValue == undefined) {
      page = page + 1;
      this.userService
        .findAllUsers(page, size)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    }
  }

  findByUserName(username: string) {
    this.userService
      .paginateByName(0, 1, username)
      .pipe(
        map((userData: UserData) => {
          this.dataSource = userData;
        })
      )
      .subscribe();
  }

  navigateToProfile(id: string) {
    this.router.navigate(['./' + id], { relativeTo: this.activatedRoute }); // activatedRoute is in respect to curr url path + id, relativeTo ensures that
  }
}
