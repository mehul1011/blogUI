import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/user/users/users.component';
import { CreateBlogEntryComponent } from './components/blog-entries/create-blog-entry/create-blog-entry.component';
import { ViewBlogEntryComponent } from './components/blog-entries/view-blog-entry/view-blog-entry.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule), // lazily loaded since it may not be accessed a lot, but login & register would be heavily used.
  },
  {
    path: 'login',
    component: LoginComponent, // eagerly ie loaded during website load itself,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'blog-entries/:id',
    component: ViewBlogEntryComponent,
  },
  {
    path: 'user',
    children: [
      // child routes from /user/...
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create-blog-entry',
    component: CreateBlogEntryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
