import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";

import { EmailComposer } from "@ionic-native/email-composer";

@Component({
  selector: "page-aboutDomper",
  templateUrl: "aboutDomperEn.html"
})
export class AboutDomperEnPage {
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
      subject: "Issue from Domper(Terms And Conditions)",
      body: "",
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
