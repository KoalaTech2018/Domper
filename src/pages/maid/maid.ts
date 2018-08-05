import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ModalContentPage } from '../maid/detail';

@Component({
  selector: 'page-maid',
  templateUrl: 'maid.html'
})
export class MaidPage {

  constructor(public navCtrl: NavController, public afd : AngularFireDatabase,
    public modalCtrl:ModalController) {
    this.getDataFromFireBase();
  }
  public maids$ : Observable<any[]>;
  maids = new Array<any>();

  getDataFromFireBase(){
    this.maids$ = this.afd.list('maids').valueChanges();
    this.maids$.subscribe(
      item => {
        this.maids = item;
      });
  }
  
  openModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {obj: this.maids[index]});
    modal.present();
  }

}
