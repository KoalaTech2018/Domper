import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { AuthService } from "../svc/auth.service";
import { SettingPage } from "../setting/setting";
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  registerForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ionViewWillLoad() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  tryRegister(value) {
    this.auth.doRegister(value).then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in now.";
        this.navCtrl.push(SettingPage);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      });
  }
 
}
