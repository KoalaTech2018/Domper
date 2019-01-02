import { Component } from '@angular/core';
import { NavController, ModalController} from "ionic-angular";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { AlertController } from "ionic-angular";

import { TranslateService } from "@ngx-translate/core";

import { ModalContentPage } from "../maid/detail";
import { SettingPage } from "../setting/setting";

@Component({
  selector: "page-maid",
  templateUrl: "collection.html"
})
export class CollectionPage {
  user: Observable<firebase.User>;
  userId;
  showLoginMessage;
  counter: number;

  public maids$: Observable<any[]>;
  maids = new Array<any>();

  public collection$: Observable<any[]>;

  userCollections = new Array<any>();

  constructor(
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    public afd: AngularFireDatabase,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.getUserCollection(this.userId);
        this.showLoginMessage = false;
      } else {
        this.userId = null;
        this.showLoginMessage = true;
      }
    });
  }

  getUserCollection(userId) {
    this.collection$ = this.afd
      .list("users/" + userId + "/collection")
      .valueChanges();

    this.collection$.subscribe(item => {
      this.counter = parseInt(
        window.localStorage.getItem("countAddedColection") != null
          ? window.localStorage.getItem("countAddedColection")
          : "0"
      );
      console.log(item.length);
      if (item.length != this.counter) {
        window.localStorage.setItem(
          "countAddedColection",
          item.length.toString()
        );
      }

      console.log(item.length);
      this.userCollections = item;
    });
  }

  deleteConfirm(collectionId) {
    let alert = this.alertCtrl.create({
      title: this.translate.instant("deleteMaidCollection"),
      message: this.translate.instant("deleteInfo"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: this.translate.instant("ok"),
          handler: () => {
            this.removeUserCollection(collectionId);
          }
        }
      ]
    });
    alert.present();
  }

  removeUserCollection(collectionId) {
    console.log(this.userId);
    console.log("/users/" + this.userId + "/collection/" + collectionId + "/");
    this.afd
      .object("/users/" + this.userId + "/collection/" + collectionId)
      .remove();

    this.counter = parseInt(
      window.localStorage.getItem("countAddedColection") != null
        ? window.localStorage.getItem("countAddedColection")
        : "0"
    );
    this.counter = this.counter - 1;
    if (this.counter == 0) {
      window.localStorage.setItem("countAddedColection", "");
    } else {
      window.localStorage.setItem(
        "countAddedColection",
        this.counter.toString()
      );
    }
    console.log("remove counter" + this.counter);
  }
  redirectToMaidDetail(maidIdFrUi) {
    console.log(maidIdFrUi);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    this.navCtrl.push(ModalContentPage, { maidId: maidIdFrUi });

    //Used to Pass parameters to other tabs
    //this.events.publish('change-tab', 1, this.companys[index]);
  }

  redirectToSettingPageForLogin() {
    this.navCtrl.push(SettingPage);
  }

  split(stringList) {
    return stringList.split(",");
  }
}
