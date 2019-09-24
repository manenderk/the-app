import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ChatChannelService } from '../chat-channel.service';
import { ChatChannel } from '../chat-channel.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { interval } from 'rxjs';
import { SocketService } from 'src/app/socket.service';



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
    private chatService: ChatService,
    private socketService: SocketService
  ) {
    this.userData = this.authService.getAuthUserDetails();
    this.socketService.receiveNewMessageEvent().subscribe(data => {
      if (data.channelId === this.channelId) {
        this.getNewChats();
      }
    });
  }

  ngOnInit() {
    this.chatFormGroup = new FormGroup({
      chatText: new FormControl()
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.senderShortName = this.stipCapitalize(this.userData.name).toUpperCase();
    const channelId: SimpleChange = changes.channelId;
    this.channelId = channelId.currentValue;
    await this.loadChannel();
    await this.loadRecipientName();
    if (this.recipientId) {
      await this.loadChat();
    }
    this.recipientShortName = this.stipCapitalize(this.recipientName).toUpperCase();
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
          const chatExists = this.chats.find(ob => ob.id === newChat.id);
          if (typeof chatExists === 'undefined') {
            console.log('Old Chats');
            console.log(this.chats);
            console.log('New Chats');
            console.log(newChat);
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
        this.socketService.sendNewMessageEvent(
          this.recipientId,
          this.channelId,
          response.chat.id
        );
        this.chats.push(response.chat);
        console.log(this.chats);
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
