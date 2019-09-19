import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatChannelService } from './chat-channel.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ChatService,
    ChatChannelService
  ]
})
export class ChatModule { }
