import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSource = new Subject<string>();
  scroll$ = this.scrollSource.asObservable();

  constructor() { }

  scrollTo(id: string) {
    this.scrollSource.next(id);
  }
}
