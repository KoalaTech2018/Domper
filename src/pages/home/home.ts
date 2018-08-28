import { Component } from '@angular/core';
import { NavController, ModalController } from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ModalContentPage } from "../maid/detail";


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

  pMaidInfo = [
    { data: "Philippines Maid 1" },
    { data: "Philippines Maid 2" },
    { data: "Philippines Maid 3" },
    { data: "Philippines Maid 4" },
    { data: "Philippines Maid 5" }
  ];

  iPaidInfo = [
    { data: "Indonesia Maid 1" },
    { data: "Indonesia Maid 2" },
    { data: "Indonesia Maid 3" },
    { data: "Indonesia Maid 4" },
    { data: "Indonesia Maid 5" }
  ];

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase,
    public modalCtrl: ModalController) {
      this.getDataFromFireBase();
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
  
}
