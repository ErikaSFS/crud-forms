import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable()
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  public loadingOn(): void {
    this.loadingSubject.next(true);
  }

  public loadingOff(): void {
    this.loadingSubject.next(false);
  }
}