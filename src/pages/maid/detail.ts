import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
// import { ProjectDto } from './projectDto';

@Component({
    selector: 'page-maid',
    templateUrl: 'detail.html'
  })
  
export class ModalContentPage {
    maid;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        this.maid = this.params.get('obj');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
  