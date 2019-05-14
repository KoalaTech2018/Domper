import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";

import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { CallNumber } from "@ionic-native/call-number/ngx";

@Component({
  selector: "page-contactUs",
  templateUrl: "contactUs.html"
})
export class ContactUsPage {
  constructor(
    private emailComposer: EmailComposer,
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public modalCtrl: ModalController,
    public callNumber: CallNumber,
    public navParams: NavParams
  ) {}

  sendEmail() {
    let email = { 
      to: "info@skylartech.net", 
      subject: "Issue From Domper", 
      body: "", 
      isHtml: true 
    };

    this.emailComposer.open(email);
  }

  contactCompanyByPhoneNo(phoneNo) {
    console.log(phoneNo);
    this.callNumber
      .callNumber(phoneNo, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }
}
