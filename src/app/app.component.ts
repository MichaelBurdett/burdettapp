import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
      private authService: AuthService,
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
