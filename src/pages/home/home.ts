import { Component } from '@angular/core';
import { NavController, ModalController, Tabs , NavParams, Events} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ModalContentPage } from "../maid/detail";

import { MaidPage } from "../maid/maid";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // { image: "../../assets/images/slide-1.jpg" },
  // { image: "../../assets/images/slide-2.jpg" },
  // { image: "../../assets/images/slide-2.jpg" }

  image = [
    { image: "../../assets/icon/Philippines.ico" },
    { image: "../../assets/icon/Indonesia.ico" }
  ];

  companyInfo = [
    { data: "Company 1" },
    { data: "Company 2" },
    { data: "Company 3" },
    { data: "Company 4" },
    { data: "Company 5" },
    { data: "Company 6" },
    { data: "Company 7" },
    { data: "Company 8" },
    { data: "Company 9" },
    { data: "Company 10" }
  ];



  constructor(public navCtrl: NavController, public afd: AngularFireDatabase,
    public modalCtrl: ModalController, public navParams: NavParams, private events: Events) {
      this.getDataFromFireBase();
    this.getCompanyiesFromFireBase();
   }

  public companies$: Observable<any[]>;
  companys = new Array<any>();
  getCompanyiesFromFireBase(){
    this.companies$ = this.afd.list("companies").valueChanges();
    // for detail page
    this.companies$.subscribe(item=>{
      this.companys = item;
    });
  }

  public maids$: Observable<any[]>;
  maids = new Array<any>();

  getDataFromFireBase() {
    this.maids$ = this.afd.list('maids').valueChanges();
    this.maids$.subscribe(
      item => {
        this.maids = item;
      });
  }

  openModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, { obj: this.maids[index] });
    modal.present();
  }

  redirectToMaid(index) {
    console.log(index);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    //this.navCtrl.push(MaidPage, { obj: this.companys[index] });
    //this.companys[index];
    this.events.publish('change-tab', 1, this.companys[index]);
  }
  
}
