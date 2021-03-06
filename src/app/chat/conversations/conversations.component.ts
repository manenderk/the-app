import { Component, OnInit } from '@angular/core';
import { ChatChannel } from '../chat-channel.model';
import { ChatChannelService } from '../chat-channel.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  selectedChannel: string;
  conversations: {
    channel_id: string;
    receipientName: string;
  }[];
  channels: ChatChannel[];
  private userData: {
    id: string;
    name: string;
  };
  contacts: {
    user_id: string;
    name: string;
  }[];

  constructor(
    private channelService: ChatChannelService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getAuthUserDetails();
    this.getContacts();
    this.loadRecentConversations();
  }

  loadRecentConversations() {
    this.conversations = [];
    this.channelService.getUserChannels(this.userData.id).subscribe(channels => {
      this.channels = channels;
      channels.forEach(channel => {
        const conversation = {
          channel_id: channel.id,
          receipientName:
            channel.user_1 === this.userData.id
              ? channel.user_2
              : channel.user_1
        };

        this.userService
          .getUser(conversation.receipientName)
          .subscribe(response => {
            conversation.receipientName =
              response.user.first_name + ' ' + response.user.last_name;
            this.conversations.push(conversation);
          });
      });
    });
  }

  getReceiverIdFromChannel(channel) {
    if (channel.user_1 === this.userData.id) {
      return channel.user_2;
    } else {
      return channel.user_1;
    }
  }

  deleteConversation(channelId) {
    this.channelService.deleteChannel(channelId).subscribe(response => {
      if (response.status === 'success') {
        if (channelId === this.selectedChannel) {
          this.selectedChannel = null;
        }
        Swal.fire(
          'Success',
          'Conversation Deleted',
          'success'
        );
        this.loadRecentConversations();
      }
    });
  }

  selectChannel(channelId) {
    this.selectedChannel = channelId;
  }

  getContacts() {
    this.contacts = [];
    this.userService.getUser(this.userData.id).subscribe(response => {
      const orgId = response.user.organization_id;
      if (!orgId) {
        return;
      }
      this.userService.getUsersOfOrganization(orgId).subscribe(users => {
        users = users.filter(user => {
          return user.id !== this.userData.id;
        });
        users.forEach(user => {
          const contact = {
            user_id: user.id,
            name: user.first_name + ' ' + user.last_name
          };
          this.contacts.push(contact);
        });
      });
    });
  }

  startChannel(recipient) {
    this.channelService.createChannel(this.userData.id, recipient).subscribe(response => {
      if (response.id) {
        this.selectedChannel = response.id;
        this.loadRecentConversations();
      }
    });
  }
}
