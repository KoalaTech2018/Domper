import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MaidPage } from '../pages/maid/maid';
import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from "../pages/setting/setting";
import { ModalContentPage } from '../pages/maid/detail';
import { CompanyInfoPage } from '../pages/companyInfo/companyInfo';
import { BranchListPage } from '../pages/companyInfo/branchList';
import { PrivatePolicyPage } from '../pages/PrivacyPolicy/privacyPolicy';
import { PrivatePolicyEnPage } from "../pages/PrivacyPolicy/privacyPolicyEn";
import { TermsAndConditionsCnPage } from "../pages/termsAndConditions/termsAndConditionsCn";
import { TermsAndConditionsEnPage } from "../pages/termsAndConditions/termsAndConditionsEn";
import { QuestionCnPage } from "../pages/question/questionCn";
import { QuestionEnPage } from "../pages/question/questionEn";
import { AboutDomperCnPage } from "../pages/aboutDomper/aboutDomperCn";
import { AboutDomperEnPage } from "../pages/aboutDomper/aboutDomperEn";
import { SearchBox } from '../pages/maid/searchBox';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from '@ionic-native/facebook'

import { AuthService } from "../pages/svc/auth.service";


import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CallNumber } from "@ionic-native/call-number";
import { EmailComposer } from "@ionic-native/email-composer";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

var config = { 
  apiKey: "AIzaSyDIlCA-Lydkcv9xQTUQAfP_ZhXSDtGR83c",
  authDomain: "domper-c6ded.firebaseapp.com",
  databaseURL: "https://domper-c6ded.firebaseio.com",
  projectId: "domper-c6ded",
  storageBucket: "domper-c6ded.appspot.com",
  messagingSenderId: "1098406345864" 
}

@NgModule({
  declarations: [
    MyApp,
    MaidPage,
    CollectionPage,
    HomePage,
    SignupPage,
    SettingPage,
    TabsPage,
    ModalContentPage,
    CompanyInfoPage,
    BranchListPage,
    PrivatePolicyPage,
    PrivatePolicyEnPage,
    TermsAndConditionsCnPage,
    TermsAndConditionsEnPage,
    QuestionCnPage,
    QuestionEnPage,
    AboutDomperEnPage,
    AboutDomperCnPage,
    SearchBox
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MaidPage,
    CollectionPage,
    HomePage,
    SignupPage,
    SettingPage,
    TabsPage,
    ModalContentPage,
    CompanyInfoPage,
    BranchListPage,
    PrivatePolicyPage,
    PrivatePolicyEnPage,
    TermsAndConditionsCnPage,
    TermsAndConditionsEnPage,
    QuestionCnPage,
    QuestionEnPage,
    AboutDomperEnPage,
    AboutDomperCnPage,
    SearchBox
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    EmailComposer,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CallNumber
  ]
})
export class AppModule {}
