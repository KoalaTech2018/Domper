import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-searchBox',
  templateUrl: 'searchBox.html'
})
export class SearchBox {
  search_age;
  search_height;
  search_weight;

  isClick = [false,false,false,false,false
            ,false,false,false,false,false,false
            ,false,false,false,false,false,false];

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  search(){
    var obj = {
      age: <number> null,
      height: <number> null,
      weight: <number> null
    };
    obj.age = this.search_age;
    obj.height = this.search_height;
    obj.weight = this.search_weight;
    this.viewCtrl.dismiss(obj);
  }

  tagClick(num){
     if(this.isClick[num]) 
        this.isClick[num] = false;
     else
        this.isClick[num] = true;
  }

}
