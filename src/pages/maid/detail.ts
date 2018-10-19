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
    console.log(this.maid);
    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
      } else {
        
        this.userId = null;
      }
    });
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

  addToCollection() {}
  public collections$: Observable<any[]>;
  collections = new Array<any>();
  addMaidToUserCollection() {
    this.afd .list("users/" + this.userId + "/collection").push(this.maid.name);

    firebase.database().ref("/users/" + this.userId + "/collection")
      .once("value")
      .then(function(snapshot) {
        var username = snapshot.val(); 
        console.log(username);
      }); 
   
  }

}



  