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
    this.setupTranslation();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  private setupTranslation(){
    console.log(navigator.language);
    //Default Language
    this.lang = "cht";

    if(navigator.language.toLowerCase().includes("hk") 
    || navigator.language.toLowerCase().includes("tw") ){
      this.lang = "cht";
    }

    if(navigator.language.toLowerCase().includes("cn")){
      this.lang = "chs";
    }

    if(navigator.language.toLowerCase().includes("en")){
      this.lang = "en";
    }
    
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
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
