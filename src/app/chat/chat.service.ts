import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  getChats(channelId) {
    return this.httpClient.get<{status: string, chats: any}>(
      environment.serverAddress + 'api/chat/' + channelId
    ).pipe(
      map(response => {
        return response.chats.map(chat => {
          return {
            id: chat.id,
            sender: chat.sender,
            receiver: chat.receiver,
            text: chat.text,
            date: new Date(chat.date)
          };
        });
      })
    );
  }

  addChat(channelId, sender, receiver, text) {
    const postData = {
      channel_id: channelId,
      sender,
      receiver,
      text
    };
    return this.httpClient.post(
      environment.serverAddress + 'api/chat',
      postData
    );
  }

  deleteChat(chatId) {
    return this.httpClient.delete(
      environment.serverAddress + 'api/chat/' + chatId
    );
  }
}
