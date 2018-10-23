import { Component, OnInit } from "@angular/core";
import { Platform, NavParams, NavController, ModalController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CompanyInfoPage } from "../companyInfo/companyInfo";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "page-maid",
  templateUrl: "detail.html"
})
export class ModalContentPage implements OnInit {
  public maid;
  user: Observable<firebase.User>;
  userId;
  maidId;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afd: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.maid = this.params.get("obj");
    this.maidId = this.params.get("maidId");
    console.log("********"+this.maidId);
    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
       
      } else {
        this.userId = null;
      }
    });

    if (this.maidId != null) {
      console.log(this.maidId);
      this.getMaidById(this.maidId);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {}

  redirectToCompanyInfo(companyName) {
    console.log("Deatil page trigger :" + companyName);
    this.navCtrl.push(CompanyInfoPage, { objString: companyName });
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
  }
}



  