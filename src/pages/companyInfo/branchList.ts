import { Component, OnInit } from "@angular/core";
import {
  Platform,
  NavParams,
  NavController,
  ViewController
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";

import { Observable } from "rxjs/Observable";

import { MaidPage } from "../maid/maid";



@Component({
  selector: "page-companyInfo",
  templateUrl: "branchList.html"
})
export class BranchListPage implements OnInit {
  public district;
  public companyUrl;
  public branches$: Observable<any[]>;
  branches = new Array<any>();
  public branch;
  public surveys2: Observable<any>;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public afd: AngularFireDatabase
  ) {
    console.log("Now @ company page");
    // Get company from detail.html by contact company
    this.district = this.params.get("objString");
    console.log(this.district);
    if (this.district != null) {
      this.getBranchesbyDistrict(this.district);
    }
  }

  getBranchesbyDistrict(districtName) {
    this.branches$ = this.afd
      .list("branches", ref =>
        ref.orderByChild("district").equalTo(districtName)
      )
      .valueChanges();
    this.branches$.subscribe(item => {
      this.branches = this.shuffle(item);
      console.log("Result" + this.branches);
    });
  }

  redirectToMaid(companyName, url) {
    console.log(">>>>> branchies.ts <<<<< Redirect to Maid list page");
    console.log(url);
    this.navCtrl.push(MaidPage, { companyName: companyName, branchUrl: url});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {}

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
}