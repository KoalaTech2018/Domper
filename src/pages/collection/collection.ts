import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "page-collection",
  templateUrl: "collection.html"
})
export class CollectionPage {
  user: Observable<firebase.User>;
  userId;
  public collection;


  constructor(private afAuth: AngularFireAuth, 
    public navCtrl: NavController) {

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

  // getMyCollection() {
  //   this.maids$ = this.afd.list("maids").valueChanges();
  //   this.maids$.subscribe(item => {
  //     console.log(item);

  //     this.maids = item;
  //     this.fullMaids = item;
  //   });
  // }
}
