import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ModalContentPage } from "../maid/detail";

import { MaidPage } from "../maid/maid";


import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user: Observable<firebase.User>;

  userProfile: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.getMaidDataFromFireBase();
    this.getCompanyiesFromFireBase();

    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => { 
      if (user) { 
        console.log(user.uid);
      } else {
        console.log("No login session");
      }
    });
  }

  public companies$: Observable<any[]>;
  companys = new Array<any>();
  getCompanyiesFromFireBase() {
    this.companies$ = this.afd
      .list("companies", ref =>
        ref.orderByChild("special_highlight").equalTo("Y")
      )
      .valueChanges();
    // for detail page
    this.companies$.subscribe(item => {
      // this.companys = item;
      this.companys = this.shuffle(item);
    });
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  public maids_in$: Observable<any[]>;
  public maids_ph$: Observable<any[]>;
  maids_in = new Array<any>();
  maids_ph = new Array<any>();

  getMaidDataFromFireBase() {
    this.maids_ph$ = this.afd
      .list("maids", ref =>
        ref.orderByChild("isPromoted").equalTo("PhilippinesY")
      )
      .valueChanges();

    this.maids_ph$.subscribe(item => {
      this.maids_ph = this.shuffle(item);
    });

    this.maids_in$ = this.afd
      .list("maids", ref =>
        ref.orderByChild("isPromoted").equalTo("IndonesiaY")
      )
      .valueChanges();
    this.maids_in$.subscribe(item => {
      this.maids_in = this.shuffle(item);
    });
  }

  openPhMaidModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids_ph[index]
    });
    modal.present();
  }

  openInMaidModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids_in[index]
    });
    modal.present();
  }

  redirectToMaid(index) {
    console.log(index);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    this.navCtrl.push(MaidPage, { obj: this.companys[index] });

    //Used to Pass parameters to other tabs
    //this.events.publish('change-tab', 1, this.companys[index]);
  }

  redirectToMaidFrCountry(country) {
    console.log(country);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    this.navCtrl.push(MaidPage, { objString: country });

    //Used to Pass parameters to other tabs
    //this.events.publish('change-tab', 1, this.companys[index]);
  }
}
