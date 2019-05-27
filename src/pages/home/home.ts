import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  NavController,
  ModalController,
  AlertController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ModalContentPage } from "../maid/detail";
import { BranchListPage } from "../companyInfo/branchList";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { MaidPage } from "../maid/maid";
import { QRScannerPage } from "../qrscanner/qrscanner"

import * as firebase from "firebase/app";
import { database } from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user: Observable<firebase.User>;

  userProfile: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public alertController: AlertController,
    public translate: TranslateService
  ) {
    try{
      this.getMaidDataFromFireBase();
      this.getCompanyiesFromFireBase();

      this.user = this.afAuth.authState;
      this.afAuth.auth.onAuthStateChanged(user => { 
        if (user) { 
          console.log(user.uid);
        } else {
          console.log("No login session");
        }
      });
    }catch(e){
      console.log(e.message);
    }
    
  }

  public companies$: Observable<any[]>;
  companys = new Array<any>();
  getCompanyiesFromFireBase() {
    this.companies$ = this.afd
      .list("companies", ref =>
        ref.orderByChild("special_highlight").equalTo("Y")
      )
      .valueChanges();
    // for detail page
    this.companies$.subscribe(item => {
      // this.companys = item;
      this.companys = this.shuffle(item);
    });
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  public maids_in$: Observable<any[]>;
  public maids_ph$: Observable<any[]>;
  maids_in = new Array<any>();
  maids_ph = new Array<any>();

  getMaidDataFromFireBase() {
    this.maids_ph$ = this.afd
      .list("maids", ref =>
        ref.orderByChild("isPromoted").equalTo("PhilippinesY")
      )
      .valueChanges();

    this.maids_ph$.subscribe(item => {
      this.maids_ph = this.shuffle(item);
    });

    this.maids_in$ = this.afd
      .list("maids", ref =>
        ref.orderByChild("isPromoted").equalTo("IndonesiaY")
      )
      .valueChanges();
    this.maids_in$.subscribe(item => {
      this.maids_in = this.shuffle(item);
    });
  }

  openPhMaidModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids_ph[index]
    });
    modal.present();
  }

  openInMaidModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids_in[index]
    });
    modal.present();
  }

  redirectToMaid(index) {
    console.log(index);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    this.navCtrl.push(MaidPage, {
      promoteCompany: this.companys[index]
    });

    //Used to Pass parameters to other tabs
    //this.events.publish('change-tab', 1, this.companys[index]);
  }

  redirectToMaidFromQrCode(index) {
    //We need to get Company Obj before redirect to Maid Page
    database().ref("companies/" + index).once("value").then(
      snapshot => {
          var company = snapshot.val();
          this.navCtrl.push(MaidPage, {
            promoteCompany: company
          });
      }
    );
  }

  redirectToMaidFrCountry(country) {
    console.log(country);
    // this.navParams = this.companys[index];
    // var t: Tabs = this.navCtrl.parent;
    // t.select(1);
    this.navCtrl.push(MaidPage, { objString: country });

    //Used to Pass parameters to other tabs
    //this.events.publish('change-tab', 1, this.companys[index]);
  }

  redirectToCompanyByDistrict(district) {
    console.log(district);

    this.navCtrl.push(BranchListPage, { objString: district });

  }

  openScanner(){
    //this.qrScanner.useBackCamera().catch((e: any) => console.log('First Error is', JSON.stringify(e)));
    
      this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          let modal = this.modalCtrl.create(QRScannerPage, {
              obj: ""
          });
          modal.present();
          modal.onDidDismiss(data => {
            if (data != null) {
              if(data.includes("DomperCompany:")){
                data = data.replace("DomperCompany:", "");
                this.redirectToMaidFromQrCode(data);
              }else{
                this.presentAlert();
              }
            }else{
              //Nothing is scan, it is closed
            }
          });
          // start scanning
          // let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          //   console.log('Scanned something', text);

          //   this.qrScanner.hide(); // hide camera preview
          //   scanSub.unsubscribe(); // stop scanning
            
          //   //this.ionApp.style.display = 'block';
          // });

          //this.qrScanner.show();
          //this.ionApp.style.display = 'none';

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      }).catch((e: any) => console.log('Error is', JSON.stringify(e)));
    }

  async presentAlert() {
    const alert = await this.alertController.create({
      title: this.translate.instant("wrongScanTitle"),
      message: this.translate.instant("wrongScanText"),
      buttons: [
        {
          text: this.translate.instant("ok")
        }
      ]
    });

    await alert.present();
  }
  
}
