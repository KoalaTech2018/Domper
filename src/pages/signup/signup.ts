import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
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
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private auth: AuthService
  ) {}

  ionViewWillLoad() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  tryRegister(value) {
    if(value.email==null || value.email==""){
      this.doAlert("Validation Error", "Please enter your Email Address");
      return;
    }
    this.auth.doRegister(value).then(res => {
        this.doAlert("Success", "You have created account successfully");
        this.navCtrl.pop();
      }, err => {
        this.doAlert("Validation Error", err.message);
      });
  }

  doAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();
  }
 
}
