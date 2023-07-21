import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId!: number;
  private sub!: Subscription;

  user!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(params['id']);
      this.userService
        .findOne(this.userId)
        .pipe(
          map((user: User | null) => {
            if (user) {
              this.user = user;
            }
          })
        )
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
