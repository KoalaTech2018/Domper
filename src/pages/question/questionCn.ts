import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";

import { EmailComposer } from "@ionic-native/email-composer";

@Component({
  selector: "page-question",
  templateUrl: "questionCn.html"
})
export class QuestionCnPage {
  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  sendEmail() {
    let email = { to: "KoalaTech2018@gmail.com", subject: "僱傭易(條款和細則)問題", body: "", isHtml: true };

    this.emailComposer.open(email);
  }
}
