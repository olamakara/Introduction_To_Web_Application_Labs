import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {

  constructor(
    private auth: AuthService
  ) { }

  showError: boolean = false;
  showOk: boolean = false;
  showLoader: boolean = false;

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  submitForm(){
    if (!this.loginForm.valid) {
      this.showError = true;
      this.showLoader = false;
      this.showOk = false;
      return;
    }
    this.showLoader = true;
    this.showError = false;
    this.showOk = true;
    let login = this.loginForm.get('login')!.value
    let pass = this.loginForm.get('password')!.value
    this.auth.signInEmailPass(String(login), String(pass))
    this.loginForm.reset()
    this.showLoader = false;
  }
}
