import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MaidPage } from '../pages/maid/maid';
import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { ResetPwdPage } from "../pages/signup/resetPwd";

import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from "../pages/setting/setting";
import { ModalContentPage } from '../pages/maid/detail';
import { CompanyInfoPage } from '../pages/companyInfo/companyInfo';
import { BranchListPage } from '../pages/companyInfo/branchList';
import { PrivatePolicyPage } from '../pages/PrivacyPolicy/privacyPolicy';
import { PrivatePolicyEnPage } from "../pages/PrivacyPolicy/privacyPolicyEn";
import { TermsAndConditionsCnPage } from "../pages/termsAndConditions/termsAndConditionsCn";
import { TermsAndConditionsEnPage } from "../pages/termsAndConditions/termsAndConditionsEn";
import { QuestionPage } from "../pages/question/question";
import { AboutDomperPage } from "../pages/aboutDomper/aboutDomper";

import { SearchBox } from '../pages/maid/searchBox';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from '@ionic-native/facebook/ngx'

import { AuthService } from "../pages/svc/auth.service";


import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CallNumber } from "@ionic-native/call-number/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QRScannerPage } from '../pages/qrscanner/qrscanner';

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
    ResetPwdPage,
    SettingPage,
    TabsPage,
    ModalContentPage,
    CompanyInfoPage,
    BranchListPage,
    PrivatePolicyPage,
    PrivatePolicyEnPage,
    TermsAndConditionsCnPage,
    TermsAndConditionsEnPage,
    QuestionPage,
    AboutDomperPage,
    SearchBox,
    QRScannerPage
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
    ResetPwdPage,
    SettingPage,
    TabsPage,
    ModalContentPage,
    CompanyInfoPage,
    BranchListPage,
    PrivatePolicyPage,
    PrivatePolicyEnPage,
    TermsAndConditionsCnPage,
    TermsAndConditionsEnPage,
    QuestionPage,
    AboutDomperPage,
    SearchBox,
    QRScannerPage
  ],
  providers: [
    QRScanner,
    InAppBrowser,
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
