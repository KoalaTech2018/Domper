import { Component, OnInit } from "@angular/core";
import { Platform, NavParams, NavController, ModalController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CompanyInfoPage } from "../companyInfo/companyInfo";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-maid",
  templateUrl: "detail.html"
})
export class ModalContentPage implements OnInit {
  public maid;
  user: Observable<firebase.User>;
  userId;
  maidId;
  isDisplay;
  counter: number;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afd: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.maid = this.params.get("obj");
    this.maidId = this.params.get("maidId");
    console.log("********" + this.maidId);
    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
      } else {
        this.userId = null;
        this.isDisplay = false;
      }
    });

    if (this.maidId != null) {
      console.log(this.maidId);
      this.getMaidById(this.maidId);
      this.isDisplay = false;
    } else {
      this.isDisplay = true;
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant("addedToCollection"),
      buttons: [this.translate.instant("ok")]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {}
  redirectToCompanyInfo(companyId) {
    console.log("Deatil page trigger :" + companyId);
    this.navCtrl.push(CompanyInfoPage, {
      companyId: companyId
    });
  }
  split(stringList) {
    return stringList.split(",");
  }

  public maids$: Observable<any[]>;
  maids = new Array<any>();

  getMaidById(maidId) {
    this.maids$ = this.afd
      .list("maids", ref => ref.orderByChild("id").equalTo(maidId))
      .valueChanges();

    this.maids$.subscribe(item => {
      console.log(">>>>> test <<<<<" + item[0]);
      this.maid = item[0];
    });
  }

  addMaidToUserCollection() {
    var self = this;
    firebase
      .database()
      .ref("/users/" + this.userId + "/collection/" + self.maid.id)
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot.val());
        var username = snapshot.val();
        if (username == null) {
          self.addCollectionToFireBase();
        } else {
          console.log("Added Already");
        }
      });
    this.presentAlert();
  }

  addCollectionToFireBase() {
    firebase
      .database()
      .ref("/users/" + this.userId + "/collection")
      .child(this.maid.id)
      .set({
        id: this.maid.id,
        name: this.maid.name,
        age: this.maid.age,
        imgUrl: this.maid.imgUrl,
        country: this.maid.country,
        fee: this.maid.fee,
        working_exp_yr: this.maid.working_exp_yr,
        language: this.maid.language
      });

    firebase
      .database()
      .ref("/users/" + this.userId + "/collection")
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot);
        var username = snapshot.val();

        console.log(username);
      });

    var tmp = window.localStorage.getItem("countAddedColection");
    console.log("tmp ounter" + tmp);
    if (tmp == "") {
      this.counter = 0;
    } else {
      this.counter = parseInt(
        window.localStorage.getItem("countAddedColection")
      );
    }
    this.counter = this.counter + 1;
    console.log("counter" + this.counter);
    window.localStorage.setItem("countAddedColection", this.counter.toString());
  }
}
