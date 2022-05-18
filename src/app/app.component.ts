import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public   appPages = [
    {title: 'Home', url: '/home', icon: 'home-outline'},
    {title: 'My Profile', url: '/profile', icon: 'person-outline'},
    {title: 'Switch City', url: '/settings/set-location', icon: '🏙'},
    {title: "Promotions", url: "/promotions", icon: "💸"}
  ];

  constructor(
      private auth: Auth,
      public authService: AuthService,
      private router : Router
  ) {}


  displayHeader() {
    return this.router.url !== '/login';
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
