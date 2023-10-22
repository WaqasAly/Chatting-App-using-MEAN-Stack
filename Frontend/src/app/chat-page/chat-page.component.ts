import { Component } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  messages: any[] = [];
  
  senderId = '...'; // Provide the senderId
  receiverId = '...'; // Provide the receiverId
  senderObj: any;
  receiverObj: any;

  constructor(private messageService: ParseService, private sessionService: SessionService) { 
    this.messages = [];
    this.senderId = this.sessionService.getSessionVariable();
    this.receiverId = this.sessionService.getSessionVariable2();
    // alert(this.senderId);
    this.getSenderObj();
    this.fetchMessages();
      // alert(this.messages[0].des);
  }

  async getSenderObj(){
    try {
      this.senderObj = await this.messageService.getUserById(this.senderId);
      this.receiverObj = await this.messageService.getUserById(this.receiverId);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  }

  async fetchMessages() {
    try {

      const res = await this.messageService.getMessages(this.senderId, this.receiverId);
      this.messages = res;
      if(this.messages.length>0){
        // alert(this.messages[0].des);
      }
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  }
}

