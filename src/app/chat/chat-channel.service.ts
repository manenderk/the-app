import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatChannelService {

  constructor(private httpClient: HttpClient) { }

  getChannel(channelId: string) {
    return this.httpClient.get<{status: string, channel: any}>(
      environment.serverAddress + 'api/chat-channel/' + channelId
    ).pipe(
      map(response => {
        return {
          id: response.channel._id,
          user_1: response.channel.user_1,
          user_2: response.channel.user_2,
          date: response.channel.date
        };
      })
    );
  }

  getUserChannels(userId: string) {
    return this.httpClient.get<{status: string, channels: any}>(
      environment.serverAddress + 'api/chat-channel/user/' + userId
    ).pipe(
      map(response => {
        return response.channels.map(channel => {
          return {
            id: channel._id,
            user_1: channel.user_1,
            user_2: channel.user_2,
            date: new Date(channel.date)
          };
        });
      })
    );
  }

  createChannel(userId1: string, userId2: string) {
    const postData = {
      user_1: userId1,
      user_2: userId2
    };
    return this.httpClient.post<{status: string, channel: any}>(
      environment.serverAddress + 'api/chat-channel',
      postData
    ).pipe(
      map(response => {
        return {
          id: response.channel._id,
          user_1: response.channel.user_1,
          user_2: response.channel.user_2,
          date: new Date(response.channel.date)
        };
      })
    );
  }

  deleteChannel(channelId: string) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/chat-channel/' + channelId
    );
  }
}
