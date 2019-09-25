import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ChatChannelService } from '../chat-channel.service';
import { ChatChannel } from '../chat-channel.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { SocketService } from 'src/app/socket.service';
import Swal from 'sweetalert2';
import { Chat } from '../chat.model';



@Component({
  selector: 'app-do-chat',
  templateUrl: './do-chat.component.html',
  styleUrls: ['./do-chat.component.css']
})
export class DoChatComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  recipientId: string;
  recipientName: string;
  recipientShortName: string;
  senderShortName: string;
  dateDividers: string[];
  chats: any;
  userData: {
    id: string;
    name: string;
  };
  channel: ChatChannel;

  chatText: string;
  chatFormGroup: FormGroup;

  isOldChat = false;
  isNewChat = false;
  isMaxChatsReached = false;
  private chatContainerHeight: number;
  private maxChats: number;
  private pageSize = 10;
  private currentPage = 1;

  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;
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
    this.currentPage = 1;
    this.maxChats = 0;
    this.isMaxChatsReached = false;

    this.dateDividers = [];
    this.chats = [];

    this.senderShortName = this.stipCapitalize(
      this.userData.name
    ).toUpperCase();

    const channelId: SimpleChange = changes.channelId;
    this.channelId = channelId.currentValue;

    this.chatService.getChatCount(this.channelId).subscribe(response => {
      if (response.status === 'success') {
        this.maxChats = response.count;
        this.isMaxChatsReached = false;
      }
    });

    await this.loadChannel();

    await this.loadRecipientName();
    if (this.recipientId) {
      await this.getNewChats();
    }
    this.recipientShortName = this.stipCapitalize(
      this.recipientName
    ).toUpperCase();
  }

  ngAfterViewInit() {
    this.chatContainer.nativeElement.addEventListener(
      'scroll',
      () => {
        if (this.chatContainer.nativeElement.scrollTop < 1) {
          this.getOldChats();
        }
      },
      true
    );
  }

  ngOnDestroy() {
    this.chatContainer.nativeElement.removeEventListener('scroll', () => {}, true);
  }

  loadChannel() {
    return new Promise((resolve, reject) => {
      this.channelService.getChannel(this.channelId).subscribe(
        channel => {
          this.channel = channel;
          resolve();
        },
        error => {
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
          this.recipientName =
            response.user.first_name + ' ' + response.user.last_name;
          return resolve();
        },
        error => {
          return reject(error);
        }
      );
    });
  }

  getNewChats() {
    this.chatService
      .getChats(this.channelId, this.pageSize, this.currentPage)
      .subscribe(
        response => {
          // response = arrayOfNewChats
          response = this.sortChats(response);
          response.forEach(newChat => {
            const chatExists = this.chats.find(ob => ob.id === newChat.id);
            if (typeof chatExists === 'undefined') {
              if (this.chats.length !== 0 && this.isDateSeperated(this.chats[this.chats.length - 1].date, newChat.date)) {
                this.dateDividers.push(newChat.id);
              }
              this.chats.push(newChat);
              this.isNewChat = true;
            }
          });
        },
        error => {}
      );
  }

  getOldChats() {
    if (!this.isMaxChatsReached) {
      this.currentPage++;
    } else {
      return;
    }

    this.chatContainerHeight = this.chatContainer.nativeElement.scrollHeight;

    this.chatService
      .getChats(this.channelId, this.pageSize, this.currentPage)
      .subscribe(
        response => {
          // response = arrayOfNewChats
          response = this.sortChats(response);
          response.forEach(newChat => {
            const chatExists = this.chats.find(ob => ob.id === newChat.id);
            if (typeof chatExists === 'undefined') {
              if (this.chats.length !== 0 && this.isDateSeperated(newChat.date, this.chats[0].date)) {
                this.dateDividers.push(this.chats[0].id);
              }
              this.chats.push(newChat);
              this.chats = this.sortChats(this.chats);
              this.isOldChat = true;
            }
          });
        },
        error => {}
      );
    if (this.currentPage * this.pageSize >= this.maxChats) {
      this.isMaxChatsReached = true;
    }
  }

  sendChat() {
    if (!this.chatFormGroup.value.chatText) {
      return;
    }
    this.chatService
      .addChat(
        this.channelId,
        this.userData.id,
        this.recipientId,
        this.chatFormGroup.value.chatText
      )
      .subscribe(response => {
        if (response) {
          this.socketService.sendNewMessageEvent(
            this.recipientId,
            this.channelId,
            response.chat.id
          );
          this.isNewChat = true;
          this.chats.push(response.chat);
          this.chatFormGroup.reset();
        }
      });
  }

  scrollToBottom() {
    if (this.isNewChat) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      this.isNewChat = false;
    } else if (this.isOldChat) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight - this.chatContainerHeight;
      this.isOldChat = false;
    }
  }

  stipCapitalize(name: string) {
    const matches = name.match(/\b(\w)/g);
    const acronym = matches.join('');
    return acronym;
  }

  deleteChat(chatId: string) {
    this.chatService.deleteChat(chatId).subscribe(response => {
      if (response.status === 'success') {
        this.chats = this.chats.filter(chat => {
          return chat.id !== chatId;
        });
        Swal.fire('Success', 'Chat is deleted', 'success');
      }
    });
  }

  sortChats(chats) {
    const newChats = chats.sort((a: Chat, b: Chat) => {
      return a.date.getTime() > b.date.getTime()
        ? 1
        : a.date.getTime() < b.date.getTime()
        ? -1
        : 0;
    });
    return newChats;
  }

  isDateSeperated(date1: Date, date2: Date) {
    if (date1.getDay() === date2.getDay()) {
      return false;
    } else {
      return true;
    }
  }
}
