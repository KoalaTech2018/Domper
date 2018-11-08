import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { EmailComposer } from "@ionic-native/email-composer";

import { PrivatePolicyPage } from "../PrivacyPolicy/privacyPolicy";
import { PrivatePolicyEnPage } from "../PrivacyPolicy/privacyPolicyEn";

import { TermsAndConditionsCnPage } from "../termsAndConditions/termsAndConditionsCn";
import { TermsAndConditionsEnPage } from "../termsAndConditions/termsAndConditionsEn";

import { QuestionCnPage } from "../question/questionCn";
import { QuestionEnPage } from "../question/questionEn";

import { AboutDomperCnPage } from "../aboutDomper/aboutDomperCn";
import { AboutDomperEnPage } from "../aboutDomper/aboutDomperEn";


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
    this.language = this.translate.getDefaultLang();
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

  redirectToPrivatePolicyPage() {
    // console.log(this.language);
    if (this.language != "en") {
      // console.log('1');
      this.navCtrl.push(PrivatePolicyPage);
    } else {
      // console.log("2");
      this.navCtrl.push(PrivatePolicyEnPage);
    }
  }

  redirectToTermsAndConditions() {
    // console.log(this.language);
    if (this.language != "en") {
      // console.log('1');
      this.navCtrl.push(TermsAndConditionsCnPage);
    } else {
      // console.log("2");
      this.navCtrl.push(TermsAndConditionsEnPage);
    }
  }

  redirectToAboutDomper() {
    // console.log(this.language);
    if (this.language != "en") {
      // console.log('1');
      this.navCtrl.push(AboutDomperCnPage);
    } else {
      // console.log("2");
      this.navCtrl.push(AboutDomperEnPage);
    }
  }

  redirectToQuestion() {
    // console.log(this.language);
    if (this.language != "en") {
      // console.log('1');
      this.navCtrl.push(QuestionCnPage);
    } else {
      // console.log("2");
      this.navCtrl.push(QuestionEnPage);
    }
  }
}
