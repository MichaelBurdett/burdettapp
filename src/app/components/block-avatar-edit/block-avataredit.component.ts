import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {AvatarService} from '../../shared/services/avatar.service';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-block-avataredit',
    templateUrl: './block-avataredit.component.html',
})

export class BlockAvatarEditComponent  implements OnInit {
  activeIndexAccessory: number;
  activeIndexClothing: number;
  activeIndexGlasses: number;
  activeIndexGlassOpacity: number;
  activeIndexHair: number;
  activeIndexHairFace: number;
  activeIndexEyes: number;
  activeIndexEyebrows: number;
  activeIndexMouth: number;
  activeIndexTattoo: number;
  submitting: boolean;
  avatarData: any;

  constructor(
    public auth: AuthService,
    public avatar: AvatarService,
    protected http: HttpClient
  ) {}

  ngOnInit() {
    this.avatar.getAvatar().subscribe(data => {
      this.avatarData = data;
      this.activeIndexAccessory = this.avatar.accesories.findIndex(x => x === this.avatarData.avatar.current_accessory);
      this.activeIndexClothing = this.avatar.clothes.findIndex(x => x === this.avatarData.avatar.current_clothes);
      this.activeIndexGlasses = this.avatar.glasses.findIndex(x => x === this.avatarData.avatar.current_glasses);
      this.activeIndexGlassOpacity = this.avatar.glassopacities.findIndex(x => x === this.avatarData.avatar.current_glassopacity);
      this.activeIndexHair = this.avatar.hairstyles.findIndex(x => x === this.avatarData.avatar.current_hairstyle);
      this.activeIndexHairFace = this.avatar.facialhairs.findIndex(x => x === this.avatarData.avatar.current_hairface);
      this.activeIndexEyes = this.avatar.eyes.findIndex(x => x === this.avatarData.avatar.current_eyes);
      this.activeIndexEyebrows = this.avatar.eyebrows.findIndex(x => x === this.avatarData.avatar.current_eyebrows);
      this.activeIndexMouth = this.avatar.mouths.findIndex(x => x === this.avatarData.avatar.current_mouth);
      this.activeIndexTattoo = this.avatar.tattoos.findIndex(x => x === this.avatarData.avatar.current_tattoo);
    });
  }

  updateAvatarHairNext(value) {
    const newValue = value + 1
    this.avatar.avatarConfig.current_hairstyle = this.avatar.hairstyles[newValue];
    this.activeIndexHair = newValue
  }
  updateAvatarHairPrev(value) {
    const newValue = value - 1
    this.avatar.avatarConfig.current_hairstyle = this.avatar.hairstyles[newValue];
    this.activeIndexHair = newValue
  }
  updateAvatarHairFaceNext(value) {
    const newValue = value + 1
    this.avatar.avatarConfig.current_hairface = this.avatar.facialhairs[newValue];
    this.activeIndexHairFace = newValue
  }
  updateAvatarHairFacePrev(value) {
    const newValue = value - 1
    this.avatar.avatarConfig.current_hairface = this.avatar.facialhairs[newValue];
    this.activeIndexHairFace = newValue
  }
  updateAvatarHairColor(event) {
    this.avatar.avatarConfig.current_haircolor = event;
  }

  updateAvatarEyeNext(value) {
    const newValue = value + 1
    this.avatar.avatarConfig.current_eyes = this.avatar.eyes[newValue];
    this.activeIndexEyes = newValue
  }
  updateAvatarEyePrev(value) {
    const newValue = value - 1
    this.avatar.avatarConfig.current_eyes = this.avatar.eyes[newValue];
    this.activeIndexEyes = newValue
  }
  updateAvatarEyeBrowsNext(value) {
    const newValue = value + 1
    this.avatar.avatarConfig.current_eyebrows = this.avatar.eyebrows[newValue];
    this.activeIndexEyebrows = newValue
  }
  updateAvatarEyeBrowsPrev(value) {
    const newValue = value - 1
    this.avatar.avatarConfig.current_eyebrows = this.avatar.eyebrows[newValue];
    this.activeIndexEyebrows = newValue
  }
  updateAvatarMouthNext(value) {
    const newValue = value + 1
    this.avatar.avatarConfig.current_mouth = this.avatar.mouths[newValue];
    this.activeIndexMouth = newValue
  }
  updateAvatarMouthPrev(value) {
    const newValue = value - 1
    this.avatar.avatarConfig.current_mouth = this.avatar.mouths[newValue];
    this.activeIndexMouth = newValue
  }
  updateAvatarTone(event) {
    this.avatar.avatarConfig.current_tone = event;
  }

  updateAvatarGlasses(value) {
    this.avatar.avatarConfig.current_glasses = this.avatar.glasses[value];
    this.activeIndexGlasses = value
  }
  updateAvatarGlassOpacity(value) {
    this.avatar.avatarConfig.current_glassopacity = this.avatar.glassopacities[value];
    this.activeIndexGlassOpacity = value
  }
  updateAvatarTattoo(value) {
    this.avatar.avatarConfig.current_tattoo = this.avatar.tattoos[value];
    this.activeIndexTattoo = value
  }
  updateAvatarAccessory(value) {
    this.avatar.avatarConfig.current_accessory = this.avatar.accesories[value];
    this.activeIndexAccessory = value
  }
  updateAvatarClothing(value) {
    this.avatar.avatarConfig.current_clothes = this.avatar.clothes[value];
    this.activeIndexClothing = value
  }
  updateAvatarClothingColor(event) {
    this.avatar.avatarConfig.current_fabriccolors = event;
  }
  updateAvatarBackground(event) {
    this.avatar.avatarConfig.current_backgroundcolor = event;
  }

  updateUserAvatar() {
    this.submitting = true;
    const userMetaData = {
      avatar: [{
        current_accessory       : this.avatar.avatarConfig.current_accessory,
        current_tone            : this.avatar.avatarConfig.current_tone,
        current_clothes         : this.avatar.avatarConfig.current_clothes,
        current_eyes            : this.avatar.avatarConfig.current_eyes,
        current_eyebrows        : this.avatar.avatarConfig.current_eyebrows,
        current_mouth           : this.avatar.avatarConfig.current_mouth,
        current_hairstyle       : this.avatar.avatarConfig.current_hairstyle,
        current_tattoo          : this.avatar.avatarConfig.current_tattoo,
        current_hairface        : this.avatar.avatarConfig.current_hairface,
        current_haircolor       : this.avatar.avatarConfig.current_haircolor,
        current_fabriccolors    : this.avatar.avatarConfig.current_fabriccolors,
        current_backgroundcolor : this.avatar.avatarConfig.current_backgroundcolor,
        current_glasses         : this.avatar.avatarConfig.current_glasses,
        current_glassopacity    : this.avatar.avatarConfig.current_glassopacity,
      }],
    }
    this.auth.SetAvatarData(userMetaData).then((result) => {
      console.log(result);
      this.submitting = false;
    }).catch((error) => {
      window.alert(error.message);
      this.submitting = false;
    });
  }
}
