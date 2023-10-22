import { Component } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { Route, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private parseService: ParseService, private router: Router, private sessionService : SessionService) { }

  async signIn(email: string, password: string) {
    const result = await this.parseService.signIn(email, password);
    if(result != null) {
      alert('Sign In successful!');
      const senderId = result.objectId;
      console.log(senderId);
      alert(senderId);
      this.sessionService.setSessionVariable(senderId);
      this.router.navigate(['/chat-list']);
    }
    else {
      alert('Sign In failed!');
    }
  }
}
