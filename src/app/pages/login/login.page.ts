import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(AuthFormComponent) loginForm: AuthFormComponent;
  constructor(
      private authService: AuthService,
      private firestore: Firestore,
      private router: Router
  ) {}

  ngOnInit() {}

  async loginUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential = await this.authService.login(credentials.email, credentials.password);
      this.authService.userId = userCredential.user.uid;
      this.setLastLogin(userCredential.user.uid, userCredential.user.metadata.lastSignInTime);
      await this.loginForm.hideLoading();
      this.router.navigateByUrl('home');
    } catch (error) {
      await this.loginForm.hideLoading();
      this.loginForm.handleError(error);
    }
  }

  setLastLogin(userUid, lastSignIn){
    const userReference = doc(this.firestore, `users/${userUid}`);
    setDoc(userReference, { lastSignIn }, { merge: true });
  }

}
