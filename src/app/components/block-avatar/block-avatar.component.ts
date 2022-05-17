import {Component, OnInit} from '@angular/core';
import { AvatarService } from '../../services/avatar.service';

@Component({
    selector: 'app-block-avatar',
    templateUrl: './block-avatar.component.html',
})

export class BlockAvatarComponent implements OnInit {



  constructor(
    public avatar: AvatarService
  ) {}

  ngOnInit() {
      if (!this.avatar.avatarLoaded) {
          this.avatar.getAvatar();
      }
  }
}
