import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignupService } from '../../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private _signUp: SignupService) {}
  credintial = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.log(this.credintial.value);
    this._signUp
      .PostCredential('http://localhost:4200/api/signin')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
