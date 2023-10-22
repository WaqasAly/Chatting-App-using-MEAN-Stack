import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor() {
    Parse.initialize('projectV1', 'projectV2');
  (Parse as any).serverURL = 'http://localhost:1336/parse'; }

  async signUp( ema: string, pass: string, fName: string, lName : string): Promise<boolean> {
    try{
      const para = {email: ema, password: pass, firstName: fName, lastName: lName };
      await Parse.Cloud.run('addUser', para);
      alert('Sign up successful hahda!');
      return true;
    }
    catch(error){
      alert('Sign up faasdasd!');
      return false;
    }
  } 
  async signIn(ema: string, pass: string): Promise<any> {
    try{
      const para = {email: ema, password: pass};
      const  res = await Parse.Cloud.run('logInUser', para);
      if(res != null){
        alert('Sign in successful!');
        return res;
      }
      else{
        alert('Sign in failed!');
        
      return null;
      }
    }
    catch(error){
      alert('Sign in failed!');
      return null;
    }
  }

  async getMessages(senderId: string, receiverId: string): Promise<any[]> {
    try {
      const result = await Parse.Cloud.run('getMessages', { senderId, receiverId });
      alert("result: " + result.length);
      return result;
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return [];
    }
  }
  async getMUsersExcept(senderId: string): Promise<any[]> {
    try {
      const result = await Parse.Cloud.run('getMUsersExcept', { senderId });
      return result;
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return [];
    }
  }
  async sendMessage(senderId: string, receiverId: string, message: string): Promise<boolean> {
    try {
      await Parse.Cloud.run('sendMessage', { senderId, receiverId, message });
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }
  async getUserById(objectId: string): Promise<any> {
    try {
      const result = await Parse.Cloud.run('getUser', { objectId });
      return result;
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  }
}
