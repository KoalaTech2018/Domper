import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";

import { EmailComposer } from "@ionic-native/email-composer/ngx";

@Component({
  selector: "page-privacyPolicy",
  templateUrl: "privacyPolicyEn.html"
})
export class PrivatePolicyEnPage {
  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  sendEmail() {
    let email = {
      to: "KoalaTech2018@gmail.com",
      subject: "Issue from Domper(Privacy Policy)",
      body: "",
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
