import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { ModalContentPage } from '../maid/detail';
import { CompanyInfoPage } from "../companyInfo/companyInfo";

@Component({
  selector: "page-maid",
  templateUrl: "maid.html"
})
export class MaidPage {
  promoteCompany;
  downloadURL;
  countryCode;
  constructor(
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public afStorage: AngularFireStorage,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    events: Events
  ) {
    console.log("Passed params", navParams.data);
    this.promoteCompany = navParams.get("obj");
    this.countryCode = navParams.get("objString");
    console.log(this.countryCode);

    if (this.promoteCompany != null && this.countryCode == null) {
      this.downloadURL = this.afStorage
        .ref("/" + this.promoteCompany.img)
        .getDownloadURL();
      this.maids$ = this.afd
        .list("maids", ref =>
          ref.orderByChild("companyName").equalTo(this.promoteCompany.name)
        )
        .valueChanges();
      this.maids$.subscribe(item => {
        this.maids = item;
      });
    } else if (this.countryCode != null) {
      console.log("From country");
      this.getMaidDataFromFireBase(this.countryCode);
    } else {
      this.getDataFromFireBase();
    }

    //Used to pass Parameters from other tabs
    // events.subscribe('change-tab', (tab, obj) => {
    //   console.log('Passed params', obj);
    // });
  }
  public maids$: Observable<any[]>;
  maids = new Array<any>();

  getDataFromFireBase() {
    this.maids$ = this.afd.list("maids").valueChanges();
    this.maids$.subscribe(item => {
      this.maids = item;
    });
  }

  openCompanyByUrl(url) {
    console.log(" ===> "+ url);
    this.navCtrl.push(CompanyInfoPage, { urlString: url });
  }

  openModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids[index]
    });
    modal.present();
  }

  getCompany() {
    return this.promoteCompany;
  }

  getItems($event) {
    let q = $event.target.value;
    this.maids$ = this.afd
      .list("maids", ref => ref.orderByChild("age").startAt(+q))
      .valueChanges();
    console.log(q);
  }

  getMaidDataFromFireBase(country) {
    this.maids$ = this.afd
      .list("maids", ref => ref.orderByChild("country").equalTo(country))
      .valueChanges();

    this.maids$.subscribe(item => {
      this.maids = item;
    });
  }
}
