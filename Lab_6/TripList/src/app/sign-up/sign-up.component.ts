import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  constructor(private auth: AuthService) {}

  showError: boolean = false;
  showOk: boolean = false;

  regForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submitForm() {
    console.log(this.regForm.valid);
    if (!this.regForm.valid) {
      this.showError = true;
      return;
    }
    let login = this.regForm.get('login')!.value;
    let pass = this.regForm.get('password')!.value;
    this.showError = false;
    this.auth.registerEmailPass(String(login), String(pass));
    this.showOk = true;
    this.regForm.reset();
  }
}
