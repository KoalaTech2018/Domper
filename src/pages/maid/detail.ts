import { Component, OnInit } from "@angular/core";
import { Platform, NavParams, NavController, ModalController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CompanyInfoPage } from "../companyInfo/companyInfo";

@Component({
  selector: "page-maid",
  templateUrl: "detail.html"
})
export class ModalContentPage implements OnInit {
  public maid;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth, 
  ) {
    console.log("I am created");
    this.maid = this.params.get("obj");
    console.log(this.maid.working_exps);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {}

  redirectToCompanyInfo(companyName) {
    console.log("Deatil page trigger :"+companyName);
    this.navCtrl.push(CompanyInfoPage, { objString: companyName });
  }

  split(stringList){
    return stringList.split(",");
  }
  
  addToCollection(){
    
  }
}



  