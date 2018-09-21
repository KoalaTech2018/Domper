import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { ModalContentPage } from '../maid/detail';

@Component({
  selector: 'page-maid',
  templateUrl: 'maid.html'
})
export class MaidPage {
  promoteCompany;
  downloadURL;

  constructor(public navCtrl: NavController, public afd : AngularFireDatabase,
    public afStorage : AngularFireStorage,
    public modalCtrl:ModalController, public navParams: NavParams, events: Events) {
   

    console.log('Passed params', navParams.data);
    this.promoteCompany = navParams.get('obj');
    if(this.promoteCompany!=null){
      this.downloadURL= this.afStorage.ref('/' + this.promoteCompany.img).getDownloadURL();
      this.maids$ = this.afd
        .list("maids", ref =>
          ref
            .orderByChild("companyName")
            .equalTo(this.promoteCompany.name)
        )
        .valueChanges();
      this.maids$.subscribe(
        item => {
          this.maids = item;
        });

    }else{
      this.getDataFromFireBase();
    }
    
    //Used to pass Parameters from other tabs
    // events.subscribe('change-tab', (tab, obj) => {
    //   console.log('Passed params', obj);
    // });
  }
  public maids$ : Observable<any[]>;
  maids = new Array<any>();

  getDataFromFireBase(){
    this.maids$ = this.afd
      .list("maids" )
      .valueChanges();
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

  getCompany() {
    return this.promoteCompany;
  }

  getItems($event){
    let q = $event.target.value;
    this.maids$ = this.afd.list('maids', 
      ref => ref.orderByChild('age').startAt(+q)
    ).valueChanges();
    console.log(q);
  }
}
