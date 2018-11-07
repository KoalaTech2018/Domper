import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;
  userId;
  userObj;

  constructor(private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private facebook: Facebook,
              private platform: Platform) {

    this.user = this.afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
    

  }

  enableLogin(){
    if(this.userId==null)
      return true;
    else 
      return false;
  }

  /// Our login Methods will go here
  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  googleLogin2() {
      this.nativeGoogleLogin();
  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': '1098406345864-nv33p7ol23grcqvrmtfpkb48207o6lqp.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      console.log(err)
    }
  }

  async facebookLogin(): Promise<any> {
    try {
      const response = await this.facebook.login(['email']);
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
      this.afAuth.auth.signInWithCredential(facebookCredential)
        .then(success => {
          console.log("Firebase success: " + JSON.stringify(success));
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      // await this.afAuth.auth.signInWithPopup(provider);
      await this.afAuth.auth.signInWithPopup(provider).then(success => {
        //console.log("Firebase success: " + JSON.stringify(success));
        console.log(" >>>>> google-login.ts <<<<< success user displayName: " + success.user.displayName);
        console.log(" >>>>> google-login.ts <<<<< success user email: " + success.user.email);
        firebase.database().ref("users/" + success.user.uid).update(
          {
            username: success.user.displayName,
            email: success.user.email
          });
      });
  
    } catch(err) {
      console.log(err)
    }
  
  }
  
  signOut() {
    console.log("logout");
    this.afAuth.auth.signOut();
    window.localStorage.setItem("countAddedColection", "");
  }

}