import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { AlertController } from "ionic-angular";

@Component({
  selector: "page-maid",
  templateUrl: "collection.html"
})
export class CollectionPage {
  user: Observable<firebase.User>;
  userId;

  public collection$: Observable<any[]>;

  userCollections = new Array<any>();

  constructor(
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public afd: AngularFireDatabase,
    public navCtrl: NavController
  ) {
    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.getUserCollection(this.userId);
      } else {
        this.userId = null;
      }
    });
  }

  getUserCollection(userId) {
    this.collection$ = this.afd
      .list("users/" + userId + "/collection")
      .valueChanges();

    this.collection$.subscribe(item => {
      console.log(item);
      this.userCollections = item;
    });
  }

  removeUserCollection(collectionId){

    let confirm = this.alertCtrl.create({
      title: 'Delete file?',
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
          }
        }
      ]
      });

    console.log(this.userId);
    console.log("/users/" + this.userId + "/collection/" + collectionId + "/");
    this.afd.object("/users/" + this.userId + "/collection/id/" + collectionId).remove();
    // firebase
    //   .database()
    //   .ref("/users/" + this.userId + "/collection/")
    //   .child(collectionId)
    //   .remove();

  }
}
