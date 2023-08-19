import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../services/scrollService/scroll-service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private scrollService: ScrollService, private router: Router) { }
  ngOnInit(): void {
    this.scrollService.scroll$.subscribe((target: string) => {
      this.scrollToContent(target);
    })
  }
  scrollToContent(id: string, offset: number = 50) {
    this.router.navigate([], {
      fragment: id,
      queryParamsHandling: 'preserve',
      preserveFragment: true
    }).then(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetPosition = element.offsetTop - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
}
