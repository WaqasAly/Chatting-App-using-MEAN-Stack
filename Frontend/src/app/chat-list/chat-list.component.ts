import { Component } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
    chats: any[] = [];
    senderId = '...'; // Provide the senderId
  
    constructor(private parseService: ParseService, private sessionService: SessionService, private router: Router) { 
      this.chats = [];
      this.senderId = this.sessionService.getSessionVariable();
      this.fetchChats();
    }
  
    async fetchChats() {
      try {
        this.chats = await this.parseService.getMUsersExcept(this.senderId);
        alert(this.senderId);
        for (let index = 0; index < this.chats.length; index++) {
          const element = this.chats[index].id;
          if(element == this.senderId){
            this.chats.splice(index,1);
          }
        }
      } catch (error) {
        console.error('Error retrieving chats:', error);
      }
    }
 
    async openChat(receiverId: string) {
      try {
        this.sessionService.setSessionVariable2(receiverId);
        const sender = this.sessionService.getSessionVariable2();
        alert(sender);
        this.router.navigate(['/chat-page']);
      } catch (error) {
        console.error('Error retrieving chats:', error);
      }
    }

}
