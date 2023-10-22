import { Component } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private parseService: ParseService) { }

  async signUp(firstName: string, lastName : string, password: string, email: string) {
    const result = await this.parseService.signUp(firstName, lastName, password, email);
    if(result){
      alert('Sign up successful!');
    }
    else{
      alert('Sign up failed!');
    }
  }
}
