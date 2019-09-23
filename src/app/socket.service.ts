import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io('http://localhost:3000');
  constructor() { }

  joinSocket(userId: string) {
    this.socket.emit('join-socket', {
      userId
    });
  }

  leaveSocket(userId: string) {
    this.socket.emit('leave-socket', {
      userId
    });
  }

  sendNewMessageEvent(recipientId: string, channelId: string, chatId: string) {
    this.socket.emit('add-message', {
      recipientId,
      channelId,
      chatId
    });
  }

  receiveNewMessageEvent() {
    const observable = new Observable<{userId: string, channelId: string, chatId: string}>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
