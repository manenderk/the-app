import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ChatChannelService } from '../chat-channel.service';
import { ChatChannel } from '../chat-channel.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-do-chat',
  templateUrl: './do-chat.component.html',
  styleUrls: ['./do-chat.component.css']
})
export class DoChatComponent implements OnInit, OnChanges, AfterViewInit {
  recipientId: string;
  recipientName: string;
  recipientShortName: string;
  senderShortName: string;
  chats: any;
  userData: {
    id: string;
    name: string;
  };
  channel: ChatChannel;

  chatText: string;
  chatFormGroup: FormGroup;

  @ViewChild('chatContainer', {static: false}) chatContainer: ElementRef;
  @Input()
  channelId: string;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private channelService: ChatChannelService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getAuthUserDetails();

    this.chatFormGroup = new FormGroup({
      chatText: new FormControl()
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    const channelId: SimpleChange = changes.channelId;
    this.channelId = channelId.currentValue;
    await this.loadChannel();
    await this.loadRecipientName();
    if (this.recipientId) {
      await this.loadChat();

      /* interval(1000).subscribe(() => {
        this.getNewChats();
      }); */
    }
    this.recipientShortName = this.stipCapitalize(this.recipientName).toUpperCase();
    this.senderShortName = this.stipCapitalize(this.userData.name).toUpperCase();
  }

  ngAfterViewInit() {}

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
          return resolve();
        }, error => {
          return reject(error);
        }
      );
    });
  }

  loadChat() {
    return new Promise((resolve, reject) => {
      this.chats = [];
      this.chatService.getChats(this.channelId).subscribe(
        response => {
          this.chats = response;
          console.log(this.chats);
          return resolve();
        }, error => {
          return reject(error);
        }
      );
    });
  }

  getNewChats() {
    this.chatService.getChats(this.channelId).subscribe(
      response => { // response = arrayOfNewChats
        response.forEach(newChat => {
          const test = this.chats.find(ob => ob.id === newChat.id);
          if (test === null) {
            this.chats.push(newChat);
          }
        });
      },
      error => {

      }
    );
  }

  sendChat() {
    if (!this.chatFormGroup.value.chatText) {
      return;
    }
    this.chatService.addChat(this.channelId, this.userData.id, this.recipientId, this.chatFormGroup.value.chatText).subscribe(response => {
      if (response) {
        this.chats.push(response.chat);
        this.chatFormGroup.reset();
      }
    });
  }

  scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  stipCapitalize(name: string) {
    const matches = name.match(/\b(\w)/g);
    const acronym = matches.join('');
    return acronym;
  }
}
