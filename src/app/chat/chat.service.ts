import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


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
            text: CryptoJS.AES.decrypt(chat.text, channelId).toString(
              CryptoJS.enc.Utf8
            ),
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
    text = CryptoJS.AES.encrypt(text.trim(), channelId.trim()).toString();
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
        console.log(
          CryptoJS.AES.decrypt(response.chat.text, channelId).toString(
            CryptoJS.enc.Utf8
          )
        );
        return {
          status: response.status,
          chat: {
            id: response.chat._id,
            channel_id: response.chat.channel_id,
            sender: response.chat.sender,
            receiver: response.chat.receiver,
            text: CryptoJS.AES.decrypt(response.chat.text, channelId).toString(CryptoJS.enc.Utf8),
            date: new Date(response.chat.date)
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
