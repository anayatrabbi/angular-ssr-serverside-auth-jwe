import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ContactService } from './contact/contact/contact.service';
import { SignupComponent } from './auth/component/signup/signup.component';
import { SignupService } from './auth/signup.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ContactComponent, SignupComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ContactComponent],
  providers: [ContactService , SignupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
