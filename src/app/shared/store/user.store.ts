import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private user: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public users: Observable<string> = this.user.asObservable();

  constructor() {}

  public setUser(value: string): void {
    this.user.next(value);
  }
}