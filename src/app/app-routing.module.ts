import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/component/signup/signup.component';
import { ContactComponent } from './contact/contact/contact.component';

const routes: Routes = [{ path: 'contact', component: ContactComponent } ,{ path: 'signIn', component: SignupComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
} , )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
