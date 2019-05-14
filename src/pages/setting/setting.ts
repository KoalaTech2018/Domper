import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { EmailComposer } from "@ionic-native/email-composer/ngx";

import { PrivatePolicyPage } from "../PrivacyPolicy/privacyPolicy";
import { PrivatePolicyEnPage } from "../PrivacyPolicy/privacyPolicyEn";

import { TermsAndConditionsCnPage } from "../termsAndConditions/termsAndConditionsCn";
import { TermsAndConditionsEnPage } from "../termsAndConditions/termsAndConditionsEn";

import { QuestionPage } from "../question/question";

import { AboutDomperPage } from "../aboutDomper/aboutDomper";

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../svc/auth.service";

import { SignupPage } from "../signup/signup";
import { ResetPwdPage } from "../signup/resetPwd";

// import { HomePage } from "../home/home";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Platform } from "ionic-angular";
import { ContactUsPage } from '../contactUs/contactUs';

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  loginForm: FormGroup;
  errorMessage: string = "";
  userName;
  language: any;
  user: Observable<firebase.User>;
  userId;
  userObj;
  showGoogle;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public translate: TranslateService,
    private emailComposer: EmailComposer,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {
    this.language = this.translate.getDefaultLang();
    if (this.platform.is("android")) {
      this.showGoogle = "N";
    } else {
      this.showGoogle = "Y";
    }

    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(user);
        this.userName = user.displayName;
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
    this.auth.resetPassword(email);
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
    if(value.email==null || value.email==""){
      this.doAlert("Please enter your Email Address");
      return;
    }
    this.auth.doLogin(value).then(
      res => {
        console.log(res);
        // this.navCtrl.push(HomePage);
      },
      err => {
        console.log(err);
        this.doAlert(err.message);
      }
    );
  }

  signup() {
    // this.auth.doRegister();
    this.navCtrl.push(SignupPage);
  }
  googleLogin() {
    this.auth.doGoogleLogin().then(
      res => {
        console.log(res);
        // this.navCtrl.push(HomePage);
      },
      err => {
        console.log(err);
        this.doAlert(err.message);
        //this.errorMessage = err.message;
      }
    );
  }

  facebookLogin() {
    this.auth.doFacebookLogin().then(
      res => {
        console.log(res);
        // this.navCtrl.push(HomePage);
      },
      err => {
        console.log(err);
        this.doAlert(err.message);
        //this.errorMessage = err.message;
      }
    );
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
    this.navCtrl.push(AboutDomperPage);
  }

  redirectToQuestion() {
      this.navCtrl.push(QuestionPage);
  }

  redirectToResetPwd() {
    this.navCtrl.push(ResetPwdPage);
  }

  redirectToContactUs(){
    this.navCtrl.push(ContactUsPage);
  }

  doAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Validation Error',
      subTitle: message,
      buttons: ['Ok']
    });

    alert.present();
  }
}
