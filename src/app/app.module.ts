import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { JWT_TOKEN } from './services/authentication-service/authentication.service';
import { TokenService } from './services/token/token.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';

import { MarkdownModule } from 'ngx-markdown';
import { AllBlogEntriesComponent } from './components/blog-entries/all-blog-entries/all-blog-entries.component';
import { CreateBlogEntryComponent } from './components/blog-entries/create-blog-entry/create-blog-entry.component';
import { UsersComponent } from './components/user/users/users.component';
import { ViewBlogEntryComponent } from './components/blog-entries/view-blog-entry/view-blog-entry.component';
import { WINDOW_PROVIDERS } from './window-token';
import { environment } from 'src/environments/environment';
import { PortfolioComponent } from './portfolio/portfolio.component';
// import { environment } from '../environments/environment';

// export function jwtOptionsFactory(tokenService: TokenService) {
//   return {
//     tokenGetter: () => tokenService.token,
//   };
// }
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserProfileComponent,
    UpdateUserProfileComponent,
    HomeComponent,
    AllBlogEntriesComponent,
    CreateBlogEntryComponent,
    ViewBlogEntryComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MarkdownModule.forRoot(),
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //     deps: [TokenService],
    //   },
    // }),
  ],
  providers: [
    WINDOW_PROVIDERS,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'NODE_ENV', useValue: environment },
    // TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
