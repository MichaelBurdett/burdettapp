import { Component, OnInit } from '@angular/core';
import {AvatarService} from "../../services/avatar.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  version: string = "0.7.2";

  appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home-outline'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person-outline'
    },
    {
      title: 'Switch City',
      url: '/settings/set-location',
      icon: '🏙'
    },
    {
      title: "Promotions",
      url: "/promotions",
      icon: "💸"
    }
  ];

  constructor(
      private avatarService: AvatarService
  ) { }

  ngOnInit() {

  }

}
