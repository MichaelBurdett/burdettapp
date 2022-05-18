import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from './profile.service';
import { Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ProfileStore } from './profile.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [ProfileStore],
})
export class ProfilePage implements OnDestroy, OnInit {

  public userProfile$: Observable<UserProfile> = this.profileStore.userProfile$;
  private userProfileSubscription: Subscription;

  public userData: any;
  public loading: boolean = true;

  achievements: any = [
      {
    id        : 1,
    title     : 'Unsavoury Username',
    desc      : 'Entered at least one banned word as a potential username',
    unlocked  : false
  },
    {
    id        : 2,
    title     : 'Awesome Avatar',
    desc      : 'Found the hidden Duggee in the Avatar',

    unlocked  : false
  }, {
    id        : 3,
    title     : 'Achievement 3',
    desc      : 'Desc to follow',
    unlocked  : false
  }];



  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private readonly profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    if (!this.userData) {
      this.userProfileSubscription = this.profileService
          .getUserProfile()
          .subscribe((userProfile: UserProfile) => {
            this.userData = userProfile;
            this.loadAchievements(this.userData.achievements);
            this.profileStore.setState(userProfile);
            this.loading = false;
          });
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

  loadAchievements(achievements) {
      let countIndex = 0;
      for (let achievementValue of achievements) {
          if (achievementValue === 1) {
            this.achievements[countIndex].unlocked = true;
          }
          countIndex++;
      }
  }

  updateName(): void {
    this.userProfileSubscription = this.userProfile$.pipe(first()).subscribe(async userProfile => {
      const alert = await this.alertCtrl.create({
        subHeader: 'Your name',
        inputs: [
          {
            type: 'text',
            name: 'fullName',
            placeholder: 'Your full name',
            value: userProfile.fullName,
          },
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              this.profileStore.updateUserName(data.fullName);
            },
          },
        ],
      });
      return await alert.present();
    });
  }

  updateDisplayName(): void {
    this.userProfileSubscription = this.userProfile$.pipe(first()).subscribe(async userProfile => {
      const alert = await this.alertCtrl.create({
        header: 'Update display name',
        subHeader: '',
        inputs: [
          {
            type: 'text',
            name: 'displayName',
            placeholder: 'Update your display name',
            value: this.userData.displayName,
          },
        ],
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Save',
            handler: data => {
              if (data.displayName === 'Test') {
                alert.subHeader = 'naughty named detected!';
                return false
              } else {
                this.profileStore.updateDisplayName(data.displayName);
              }

            },
          },
        ],
      });
      return await alert.present();
    });
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileStore.updateUserEmail({ email: data.newEmail, password: data.password });
          },
        },
      ],
    });
    return await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileStore.updateUserPassword({ newPassword: data.newPassword, oldPassword: data.oldPassword });
          },
        },
      ],
    });
    return await alert.present();
  }
}
