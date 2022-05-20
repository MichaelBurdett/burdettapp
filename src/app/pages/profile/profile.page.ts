import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import { UserProfile } from 'src/app/models/user';
import { ProfileService } from './profile.service';
import { Observable, Subscription } from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import { ProfileStore } from './profile.store';
import {HttpClient} from '@angular/common/http';
import {BlockAvatarEditComponent} from "../../components/block-avatar-edit/block-avataredit.component";


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
  public naughtyWordList: any;
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
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private readonly profileStore: ProfileStore,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
     this.http.get('/assets/badwords.txt', { responseType: 'text'}).subscribe(data => {
       this.naughtyWordList = data
     })
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
      let currentDisplayName = this.userData.displayName;
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
              const tmpName = data.displayName.toLowerCase();
              if (this.naughtyWordList.indexOf(tmpName) > -1) {
                alert.subHeader = 'Naughty named detected!';
                this.checkAchievement(0);
                return false
              } else if (this.naughtyWordList.indexOf(tmpName) === -1){
                console.log('Firing anyway');
                this.profileStore.updateDisplayName(data.displayName);
              } else {
                console.log('Not sure how we got here')
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

  async checkAchievement(achievement) {
    if (this.achievements[achievement].unlocked === true){
      console.log('Already unlocked')
    } else {
      console.log('Not unlocked!')
      const toast = await this.toastCtrl.create({
        header: 'Achievement Unlocked!',
        message: '',
        duration: 3000,
        cssClass: 'toast-achievement',
        icon: 'trophy',
        position: 'top'
      });
      await toast.present();

      this.achievements[achievement].unlocked = true;

      let tmpAchievements: number[] = [];
      for (let achievement of this.achievements) {
        if (achievement.unlocked === true) {
          tmpAchievements.push(1);
        } else {
          tmpAchievements.push(0);
        }
      }
      this.profileStore.updateAchievements(tmpAchievements);
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: BlockAvatarEditComponent,

      backdropDismiss: false,
      swipeToClose: false,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9
    });
    await modal.present();
  }
}
