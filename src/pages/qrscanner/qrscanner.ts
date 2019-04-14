import { Component } from "@angular/core";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import {
  ViewController,
  NavController,
  ModalController,
  NavParams
} from "ionic-angular";

@Component({
  selector: "page-qrscanner",
  templateUrl: "qrscanner.html"
})
export class QRScannerPage {

  protected light: boolean = false;
  protected frontCamera: boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private viewController: ViewController
  ) {}

  toggleCamera() {
      this.frontCamera = !this.frontCamera;

      if (this.frontCamera) {
          window['QRScanner'].useFrontCamera();
      } else {
          window['QRScanner'].useBackCamera();
      }
  }

  toggleLight() {
      this.light = !this.light;

      if (this.light) {
          window['QRScanner'].enableLight();
      } else {
          window['QRScanner'].disableLight();
      }
  }

  setupScanner() {
    // start scanning
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      console.log('Scanned something', text);

      //this.qrScanner.hide(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning
      this.close(text);
      //this.ionApp.style.display = 'block';
    });
  }

  close(data:any = null) {
      this.viewController.dismiss(data);
  } 

  ionViewWillEnter() {
      this.setupScanner();
      this.qrScanner.show();

      var ionApp1 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[0];
      ionApp1.style.display = 'none';
      var ionApp2 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[1];
      ionApp2.style.display = 'none';
      var ionApp3 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[2];
      ionApp3.style.display = 'none';
  }

  ionViewWillLeave() {
      //window.document.querySelector('ion-app > .app-root').classList.remove('hide');
      var ionApp1 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[0];
      ionApp1.style.display = 'block';
      var ionApp2 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[1];
      ionApp2.style.display = 'block';
      var ionApp3 = <HTMLElement>document.getElementsByTagName('ion-app')[0].childNodes[2];
      ionApp3.style.display = 'block';

      this.qrScanner.hide();
  }

  ionViewCanEnter() {
    // if (window['QRScanner']) {
    //     return true;
    // } else {
    //     return false;
    // }
  }
}
