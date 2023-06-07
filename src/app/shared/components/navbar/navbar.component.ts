import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../store/user.store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public username!: Observable<string>;

  constructor(private $user: UserStore) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.username = this.$user.users;
  }
}