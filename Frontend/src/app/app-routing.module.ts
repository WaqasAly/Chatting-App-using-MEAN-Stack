import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full'},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'chat-list', component: ChatListComponent},
  { path: 'chat-page', component: ChatPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
