import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-searchBox',
  templateUrl: 'searchBox.html'
})
export class SearchBox {
  search_age;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  search(){
    this.viewCtrl.dismiss(this.search_age);
  }
}
