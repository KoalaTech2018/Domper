import { Component, OnInit } from "@angular/core";
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: "page-maid",
  templateUrl: "detail.html"
})
export class ModalContentPage implements OnInit {


  public maid;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log("I am created");
    this.maid = this.params.get("obj");
    console.log(this.maid.working_exps);

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {}
}



  