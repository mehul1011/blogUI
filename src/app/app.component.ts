import { Component, HostListener } from '@angular/core';
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
  isSmallScreen = false;
  showToggleDropDownMenu = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private scrollService: ScrollService
  ) { }

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

  setIsSmallScreen() {
    // this.isSmallScreen = true;
    this.showToggleDropDownMenu = !this.showToggleDropDownMenu;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    // Check if the click event occurred outside the target element
    if (!this.isClickInsideComponent(event)) {
      this.setIsSmallScreen();
    }
  }

  // Helper function to check if the click occurred inside the component
  private isClickInsideComponent(event: MouseEvent): boolean {
    const buttonElement = document.getElementById("portfolioSmallScreenButton");
    // const element = event.target as HTMLElement;
    if (buttonElement) {
      return buttonElement.contains(event.target as Node);
    }
    return false;
  }
}
