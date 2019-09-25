import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  getChats(channelId, pageSize, currentPage) {
    return this.httpClient.get<{status: string, chats: any}>(
      environment.serverAddress + 'api/chat/' + channelId + '/?pageSize=' + pageSize + '&currentPage=' + currentPage
    ).pipe(
      map(response => {
        return response.chats.map(chat => {
          return {
            id: chat._id,
            sender: chat.sender,
            receiver: chat.receiver,
            text: chat.text,
            date: new Date(chat.date)
          };
        });
      })
    );
  }

  getChatCount(channelId: string) {
    return this.httpClient.get<{status: string, count: number}>(
      environment.serverAddress + 'api/chat/chat-count/' + channelId
    );
  }

  addChat(channelId, sender, receiver, text) {
    const postData = {
      channel_id: channelId,
      sender,
      receiver,
      text
    };
    return this.httpClient.post<{status: string; chat: any}>(
      environment.serverAddress + 'api/chat',
      postData
    ).pipe(
      map(response => {
        return {
          status: response.status,
          chat: {
            id: response.chat._id,
            channel_id: response.chat.channel_id,
            sender: response.chat.sender,
            receiver: response.chat.receiver,
            text: response.chat.text,
            date: response.chat.date
          }
        };
      })
    );
  }

  deleteChat(chatId: string) {
    return this.httpClient.delete<{status: string, message: string}>(
      environment.serverAddress + 'api/chat/' + chatId
    );
  }
}
