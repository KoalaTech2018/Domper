import { Component, OnInit } from "@angular/core";
import {
  Platform,
  NavParams,
  NavController,
  ModalController,
  ViewController
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs/Observable";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";

@Component({
  selector: "page-companyInfo",
  templateUrl: "companyInfo.html"
})
export class CompanyInfoPage implements OnInit {
  public companyId;
  public companyUrl;
  public companies$: Observable<any[]>;
  companies = new Array<any>();
  public company;
  public surveys2: Observable<any>;

  public branches$: Observable<any[]>;
  branches = new Array<any>();

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afd: AngularFireDatabase,
    public afStorage: AngularFireStorage,
    public callNumber: CallNumber,
    private emailComposer: EmailComposer
  ) {
    console.log("Now @ company page");
    // Get company from detail.html by contact company
    this.companyId = this.params.get("companyId");
    this.companyUrl = this.params.get("urlString");
    console.log(this.companyId);
    console.log(this.companyUrl);
    if (this.companyId != null) {
      console.log("From detail:"+this.companyId);
      this.getCompanybyName(this.companyId);
    } else if (this.companyUrl != null) {
      console.log("From banner");
      this.getCompanybyUrl(this.companyUrl, this.companyId);
    }

   
  }

  getCompanybyName(companyId) {
    this.companies$ = this.afd.list("companies", ref => ref.orderByChild("id").equalTo(companyId))
      .valueChanges();
    this.companies$.subscribe(item => {
      this.company = item;
      console.log(this.company);
    });

    this.getBranchesByCompanyId(companyId);
  }

  getCompanybyUrl(url, companyId) {
    this.companies$ = this.afd
      .list("companies", ref => ref.orderByChild("imgUrl").equalTo(url))
      .valueChanges();
    this.companies$.subscribe(item => {
      this.company = item;
      console.log(this.company);
    });

    this.getBranchesByCompanyId(companyId);
  }

  getBranchesByCompanyId(companyId) {
    this.branches$ = this.afd
      .list("branches", ref => ref.orderByChild("companyId").equalTo(companyId))
      .valueChanges();
    this.branches$.subscribe(item => {
      this.branches = item;
      console.log("Result" + this.branches);
    });
  }

  contactCompanyByPhoneNo(phoneNo) {
    console.log(phoneNo);
    this.callNumber
      .callNumber(phoneNo, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }

  sendEmail(emailAddress) {
    console.log(emailAddress);
    let email = {
      to: emailAddress,
      subject: "My Cool Image",
      body: "Hey Simon, what do you thing about this image?",
      isHtml: true
    };

    this.emailComposer.open(email);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {}
}