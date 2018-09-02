import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MaidPage } from '../pages/maid/maid';
import { CollectionPage } from '../pages/collection/collection';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from "../pages/setting/setting";
import { ModalContentPage } from '../pages/maid/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
    SettingPage,
    TabsPage,
    ModalContentPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MaidPage,
    CollectionPage,
    HomePage,
    SettingPage,
    TabsPage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
