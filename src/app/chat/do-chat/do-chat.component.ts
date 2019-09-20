import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ChatChannelService } from '../chat-channel.service';
import { ChatChannel } from '../chat-channel.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-do-chat',
  templateUrl: './do-chat.component.html',
  styleUrls: ['./do-chat.component.css']
})
export class DoChatComponent implements OnInit, OnChanges {
  recipientId: string;
  recipientName: string;
  userData: {
    id: string;
    name: string;
  };
  channel: ChatChannel;

  @Input()
  channelId: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private channelService: ChatChannelService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getAuthUserDetails();
  }

  async ngOnChanges(changes: SimpleChanges) {
    const channelId: SimpleChange = changes.channelId;
    this.channelId = channelId.currentValue;
    await this.loadChannel();
    await this.loadRecipientName();
  }

  loadChannel() {
    return new Promise((resolve, reject) => {
      this.channelService.getChannel(this.channelId).subscribe(
        channel => {
          this.channel = channel;
          resolve();
        }, error => {
          reject(error);
        }
      );
    });
  }

  loadRecipientName() {
    return new Promise((resolve, reject) => {
      if (!this.channel) {
        return reject();
      }

      this.recipientId =
        this.channel.user_1 === this.userData.id
          ? this.channel.user_2
          : this.channel.user_1;

      this.userService.getUser(this.recipientId).subscribe(
        response => {
          this.recipientName = response.user.first_name + ' ' + response.user.last_name;
          console.log(this.recipientName);
          return resolve();
        }, error => {
          return reject(error);
        }
      );
    });
  }
}
