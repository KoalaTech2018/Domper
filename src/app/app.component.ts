import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  lang: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public translate: TranslateService
  ) {
    console.log(navigator.language);
    this.lang = navigator.language;
    if (this.lang == null){
      this.lang = "zh-TW";
    }
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // private _initTranslate() {
  //   // Set the default language for translation strings, and the current language.
  //   this.translate.setDefaultLang(this.lang);

  //   if (this.translate.getBrowserLang() !== undefined) {
  //     this.translate.use(this.translate.getBrowserLang());
  //   } else {
  //     this.translate.use(this.lang); // Set your language here
  //   }
  // }
}
