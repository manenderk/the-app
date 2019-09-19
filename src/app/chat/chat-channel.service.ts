import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatChannelService {

  constructor(private httpClient: HttpClient) { }

  getChannels(userId: string) {
    return this.httpClient.get<{status: string, feeds: any}>(
      environment.serverAddress + 'api/chat-channel/' + userId
    ).pipe(
      map(response => {
        return response.feeds.map(feed => {
          return {
            id: feed._id,
            user_1: feed.user_1,
            user_2: feed.user_2,
            date: new Date(feed.date)
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
    return this.httpClient.post<{status: string, }>(
      environment.serverAddress + 'api/chat-channel',
      postData
    );
  }

  deleteChannel(channelId: string) {
    return this.httpClient.delete(
      environment.serverAddress + 'api/chat-channel/' + channelId
    );
  }
}
