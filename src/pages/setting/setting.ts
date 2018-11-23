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

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../svc/auth.service";

import { SignupPage } from "../signup/signup";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  language: any;
  user: Observable<firebase.User>;
  userId;
  userObj;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public translate: TranslateService,
    private emailComposer: EmailComposer,
    public formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.language = this.translate.getDefaultLang();

    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  resetPassword(email: string) {
    this.auth.resetPassword(email)
  }

  enableLogin() {
    if (this.userId == null) return true;
    else return false;
  }
  changeLanguage() {
    console.log(this.language);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

  tryLogin(value) {
    this.auth.doLogin(value).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  signup() {
    // this.auth.doRegister();
    this.navCtrl.push(SignupPage);
  }
  googleLogin() {
    this.auth.doGoogleLogin().then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  facebookLogin() {
    this.auth.doFacebookLogin().then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  signOut() {
    console.log("logout");
    this.afAuth.auth.signOut();
    window.localStorage.setItem("countAddedColection", "");
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
