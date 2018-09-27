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
import { CallNumber } from "@ionic-native/call-number";

@Component({
  selector: "page-companyInfo",
  templateUrl: "companyInfo.html"
})
export class CompanyInfoPage implements OnInit {
  public companyName;
  public companyUrl;
  public companies$: Observable<any[]>;
  companies = new Array<any>();
  public company;
  public  surveys2: Observable<any>;;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public afd: AngularFireDatabase,
    public afStorage: AngularFireStorage,
    public callNumber: CallNumber
  ) {
    console.log("Now @ company page");
    // Get company from detail.html by contact company
      this.companyName = this.params.get("objString");
      this.companyUrl = this.params.get("urlString");
      console.log(this.companyName);
      console.log(this.companyUrl);
      if (this.companyName != null) {
          console.log("From detail");
          this.getCompanybyName(this.companyName);
      } else if (this.companyUrl!=null){
          console.log("From banner");
          this.getCompanybyUrl(this.companyUrl);
      }

    
  }

  getCompanybyName(compnayName){
      this.companies$ = this.afd
        .list("companies", ref =>
          ref.orderByChild("name").equalTo(compnayName)
        )
        .valueChanges();
      this.companies$.subscribe(item => {
          this.company = item;
          console.log(this.company);
      });
  }

    getCompanybyUrl(url) {
        this.companies$ = this.afd
          .list("companies", ref =>
            ref.orderByChild("imgUrl").equalTo(url)
          )
          .valueChanges();
        this.companies$.subscribe(item => {
            this.company = item;
            console.log(this.company);
        });
    }

  contactCompanyByPhoneNo(phoneNo){
      console.log(phoneNo);
      this.callNumber
        .callNumber(phoneNo, true)
        .then(res => console.log("Launched dialer!", res))
        .catch(err => console.log("Error launching dialer", err));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {}
}