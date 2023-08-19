import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { ScrollService } from './services/scrollService/scroll-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '<MehulCodes />';
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private scrollService: ScrollService
  ) {}

  navigateTo(value: any) {
    this.router.navigate(['../', value]);
  }

  logout() {
    this.authService.logout();
  }

  scrollToContent(id: string) {
    this.scrollService.scrollTo(id);
    // const extras: NavigationExtras = {
    //   fragment: id
    // };
    // this.router.navigate(['/'], extras);
  }
}
