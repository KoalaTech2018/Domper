import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-searchBox',
  templateUrl: 'searchBox.html'
})
export class SearchBox {
  search_age;
  isClick1 = false;
  isClick2 = false;
  isClick3 = false;
  isClick4 = false;
  
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  search(){
    this.viewCtrl.dismiss(this.search_age);
  }
  tagClick1(){
     if(this.isClick1) 
        this.isClick1 = false;
     else
        this.isClick1 = true;
  }
  tagClick2(){
     if(this.isClick2) 
        this.isClick2= false;
     else
        this.isClick2 = true;
  }
  tagClick3(){
     if(this.isClick3) 
        this.isClick3 = false;
     else
        this.isClick3 = true;
  }
  tagClick4(){
     if(this.isClick4) 
        this.isClick4 = false;
     else
        this.isClick4 = true;
  }

}
