import { Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Auth, onAuthStateChanged, User} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  deleteDoc,
  addDoc,
  runTransaction,
  getDoc,
  getDocs
} from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import {Avatar } from "../models/avatar";
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  avatarLoaded: boolean;

  tones =             ['ffdbb4' , 'edb98a'    , 'fd9841', 'fcee93', 'd08b5b', 'ae5d29', '614335'];
  eyes =              ['Default', 'Dizzy'     , 'Eyeroll', 'Happy', 'Closed', 'Hearts', 'Side', 'Wink', 'Squint', 'Surprised', 'Wink (silly)', 'Cry'];
  eyebrows =          ['Default', 'Default 2' , 'Raised', 'Sad', 'Sad 2', 'United', 'Updown', 'Updown 2', 'Angry', 'Angry 2'];
  mouths =            ['Default', 'Twinkle'   , 'Tongue', 'Smile', 'Serious', 'Scream', 'Sad', 'Grimace', 'Eating', 'Disbelief', 'Concerned', 'Queasy'];
  hairstyles =        ['None'   , 'Long hair' , 'Long hair - Bob', 'Hairbun', 'Long hair - Curly', 'Long hair - Curvy', 'Long hair - Dreads', 'Middlecut', 'Middlecut - Alt', 'Long hair - Straight', 'Long hair - Straight 2', 'Short hair - Dreads', 'Short hair - Dreads 2', 'Short hair - Frizzle', 'Short hair - Shaggy', 'Short hair - Curly', 'Short hair - Flat', 'Short hair - Round', 'Short hair - Waved', 'Short hair - Sides'];
  haircolors =        [['bb7748', '9a4f2b'    , '6f2912'], ['404040', '262626', '101010'], ['c79d63', 'ab733e', '844713'], ['e1c68e', 'd0a964', 'b88339'], ['906253', '663d32', '3b1d16'], ['f8afaf', 'f48a8a', 'ed5e5e'], ['f1e6cf', 'e9d8b6', 'dec393'], ['d75324', 'c13215', 'a31608'], ['59a0ff', '3777ff', '194bff']];
  facialhairs =       ['None'   , 'Magnum'    , 'Fancy', 'Magestic', 'Light'];
  clothes =           ['V-Neck' , 'Sweater'   , 'Hoodie', 'Overall', 'Blazer'];
  fabriccolors =      ['545454' , '5199e4'    , '25557c', 'e6e6e6', 'a7ffc4', 'ffdeb5', 'ffffb1', 'ff5c5c', 'e3adff'];
  backgroundcolors =  ['ffffff' , 'f5f6eb'    , 'e5fde2', 'd5effd', 'd1d0fc', 'f7d0fc', 'd0d0d0'];
  glasses =           ['None'   , 'Rambo'     , 'Fancy', 'Old', 'Nerd', 'Fancy 2', 'Harry'];
  glassopacities =    ['0.10'   , '0.25'      , '0.50', '0.75', '1'];
  tattoos =           ['None'   , 'Harry'     , 'Avatar', 'Front', 'Tribal', 'Tribal 2', 'Throat'];
  accesories =        ['None'   , 'Earphones' , 'Earring 1', 'Earring 2', 'Earring 3'];

  avatarConfig: any = {
    current_accessory       : '',
    current_tone            : '',
    current_clothes         : '',
    current_eyes            : '',
    current_eyebrows        : '',
    current_mouth           : '',
    current_hairstyle       : '',
    current_tattoo          : '',
    current_hairface        : '',
    current_haircolor       : ['', '', ''],
    current_fabriccolors    : '',
    current_backgroundcolor : '',
    current_glasses         : '',
    current_glassopacity    : '',
  };

  constructor(
      protected router: Router,
      private readonly auth: Auth,
      private readonly User: Auth,
      private readonly firestore: Firestore,
      protected http: HttpClient
  ) { }

  getAvatar(){
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const docRef = doc(this.firestore, "users", user.uid);
        const userData = await getDoc(docRef);

        if (userData.exists()) {
          const remoteAvatarData = userData.data().avatar;
          this.avatarConfig.current_accessory = remoteAvatarData.current_accessory;
          this.avatarConfig.current_tone = remoteAvatarData.current_tone;
          this.avatarConfig.current_clothes = remoteAvatarData.current_clothes;
          this.avatarConfig.current_eyes = remoteAvatarData.current_eyes;
          this.avatarConfig.current_eyebrows = remoteAvatarData.current_eyebrows;
          this.avatarConfig.current_mouth = remoteAvatarData.current_mouth;
          this.avatarConfig.current_hairstyle = remoteAvatarData.current_hairstyle;
          this.avatarConfig.current_tattoo = remoteAvatarData.current_tattoo;
          this.avatarConfig.current_hairface = remoteAvatarData.current_hairface;
          this.avatarConfig.current_haircolor = remoteAvatarData.current_haircolor;
          this.avatarConfig.current_fabriccolors = remoteAvatarData.current_fabriccolors;
          this.avatarConfig.current_backgroundcolor = remoteAvatarData.current_backgroundcolor;
          this.avatarConfig.current_glasses = remoteAvatarData.current_glasses;
          this.avatarConfig.current_glassopacity = remoteAvatarData.current_glassopacity;
          this.avatarLoaded = true;
          console.log(this.avatarConfig);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {}
    });

  }

  setAvatar() {

  }
}
