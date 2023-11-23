import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject: Subject<MessageEvent>;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        let sendMessage = { message: "sendmessage", data: JSON.stringify(data) };
        if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) {
          // With closed socket, user will just be notified by other processes that they
          // should refresh. No need for action.
          return;
        }
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendMessage));
        } else {
          // If websocket not yet open, keep trying once per second for 5 seconds
          setTimeout(function () {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(sendMessage));
            } else {
              setTimeout(function () {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify(sendMessage));
                } else {
                  setTimeout(function () {
                    if (ws.readyState === WebSocket.OPEN) {
                      ws.send(JSON.stringify(sendMessage));
                    } else {
                      setTimeout(function () {
                        if (ws.readyState === WebSocket.OPEN) {
                          ws.send(JSON.stringify(sendMessage));
                        } else {
                          alert('Could not connect to websocket. Please contact your Scout leader.');
                        }
                      }, 1000);   
                    }
                  }, 1000);
                }
              }, 1000);    
            }
          }, 1000);
        }
      }
    };
    return Subject.create(observer, observable);
  }
}