import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { EmailComposer } from "@ionic-native/email-composer";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  language: any;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private emailComposer: EmailComposer
  ) {
    this.language = navigator.language;
  }

  changeLanguage() {
    console.log(this.language);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

  sendEmail() {
    let email = {
      to: "KoalaTech2018@gmail.com",
      subject: "Issue from Domper",
      body: "",
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
