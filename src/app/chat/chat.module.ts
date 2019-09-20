import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatChannelService } from './chat-channel.service';
import { ConversationsComponent } from './conversations/conversations.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from '../auth/auth.gaurd';
import { MaterialModule } from '../material.module';
import { DoChatComponent } from './do-chat/do-chat.component';

const routes: Routes = [
  {
    path: 'conversations',
    component: ConversationsComponent,
    canActivate: [AuthGaurd]
  }
];

@NgModule({
  declarations: [ConversationsComponent, DoChatComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [ChatService, ChatChannelService]
})
export class ChatModule {}
