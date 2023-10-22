import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionVariableKey = 'senderId';
  private sessionVariableKey2 = 'receiverId';b

  setSessionVariable(value: any): void {
    sessionStorage.setItem(this.sessionVariableKey, JSON.stringify(value));
  }

  getSessionVariable(): any {
    const value = sessionStorage.getItem(this.sessionVariableKey);
    if (value !== null) {
      return JSON.parse(value);
    }
    // Handle the case when the value is null, e.g., return a default value or throw an error
    return null; // Or return a default value or throw an error
  }
  
  removeSessionVariable(): void {
    sessionStorage.removeItem(this.sessionVariableKey);
  }

  setSessionVariable2(value: any): void {
    sessionStorage.setItem(this.sessionVariableKey2, JSON.stringify(value));
  }

  getSessionVariable2(): any {
    const value = sessionStorage.getItem(this.sessionVariableKey2);
    if (value !== null) {
      return JSON.parse(value);
    }
    // Handle the case when the value is null, e.g., return a default value or throw an error
    return null; // Or return a default value or throw an error
  }

  removeSessionVariable2(): void {
    sessionStorage.removeItem(this.sessionVariableKey2);
  }
  
}
