import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  language: any;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService
  ) {
    this.language = navigator.language;
  }

  changeLanguage() {
    console.log(this.language);
    this.translate.use(this.language);
  }
}
