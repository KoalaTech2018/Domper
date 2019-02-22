import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  NavParams,
  Events
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs/Observable";
import { ModalContentPage } from "../maid/detail";
import { CompanyInfoPage } from "../companyInfo/companyInfo";
import { SearchBox } from "../maid/searchBox";
import { map } from "rxjs/operators";

@Component({
  selector: "page-maid",
  templateUrl: "maid.html"
})
export class MaidPage {
  companyId;
  promoteCompany;
  downloadURL;
  countryCode;
  branchObj;
  itemsRef: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public afStorage: AngularFireStorage,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    events: Events
  ) {
    console.log("Passed params", navParams.data);
    this.branchObj = navParams.get("branchObj");
    this.promoteCompany = navParams.get("promoteCompany");
    this.countryCode = navParams.get("objString");
    console.log(this.countryCode);

    if (
      (this.promoteCompany != null || this.branchObj != null) &&
      this.countryCode == null
    ) {
      if (this.promoteCompany == null) {
        this.downloadURL = this.branchObj.branchUrl;
        this.companyId = this.branchObj.companyId;
      } else {
        this.downloadURL = this.promoteCompany.imgUrl;
        this.companyId = this.promoteCompany.id;
      }

      // = this.afStorage
      //   .ref("/" + this.promoteCompany.img)
      //   .getDownloadURL();

      this.maids$ = this.afd
        .list("maids", ref =>
          ref.orderByChild("companyId").equalTo(this.companyId)
        )
        .valueChanges();
      this.maids$.subscribe(item => {
        this.maids = item;
        this.fullMaids = item;
      });
    } else if (this.countryCode != null) {
      console.log("From country");
      this.getMaidDataFromFireBase(this.countryCode);
    } else {
      this.getDataFromFireBase();
    }

    //Used to pass Parameters from other tabs
    // events.subscribe('change-tab', (tab, obj) => {
    //   console.log('Passed params', obj);
    // });
  }
  public maids$: Observable<any[]>;
  fullMaids = new Array<any>();
  maids = new Array<any>();

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

  getDataFromFireBase() {

    this.itemsRef = this.afd.list("maids");
    // Use snapshotChanges().map() to store the key
    this.maids$ = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key,
          ...c.payload.val()
        }))
      )
    );
    this.maids$.subscribe(item => {
      console.log("total item queried" + item);

      this.maids = this.shuffle(item);
      this.fullMaids = this.shuffle(item);
    });
  }

  openCompanyByUrl(url) {
    console.log(" ===> " + url);
    this.navCtrl.push(CompanyInfoPage, {
      urlString: url,
      companyId: this.companyId
    });
  }

  openModal(index) {
    console.log(index);
    let modal = this.modalCtrl.create(ModalContentPage, {
      obj: this.maids[index]
    });
    modal.present();
  }

  getCompany() {
    return this.promoteCompany;
  }

  getMaidDataFromFireBase(country) {
    this.maids$ = this.afd
      .list("maids", ref => ref.orderByChild("country").equalTo(country))
      .valueChanges();

    this.maids$.subscribe(item => {
      this.maids = this.shuffle(item);
      this.fullMaids = this.shuffle(item);
    });
  }

  split(stringList) {
    return stringList.split(",");
  }

  openSearchBox() {
    let modal = this.modalCtrl.create(SearchBox, {
      obj: ""
    });
    modal.onDidDismiss(data => {
      if (data != null) {
        // this.maids$ = this.afd
        // .list("maids", ref =>
        //   ref.orderByChild("age").startAt(+data)
        // )
        // .valueChanges();
        console.log("HIT");
        console.log(this.fullMaids);
        var newList = new Array<any>();
        for (var i in this.fullMaids) {
          if (data.height != null && this.fullMaids[i].height == data.height) {
            newList.push(this.fullMaids[i]);
            continue;
          }
          if (data.weight != null && this.fullMaids[i].weight == data.weight) {
            newList.push(this.fullMaids[i]);
            continue;
          }
          if (data.age != null && this.fullMaids[i].age == data.age) {
            newList.push(this.fullMaids[i]);
            continue;
          }
          for (var j in data.skillList) {
            if (this.fullMaids[i].skills.includes(data.skillList[j])) {
              newList.push(this.fullMaids[i]);
              break;
            }
          }
        }
        if (newList.length > 0) {
          this.maids = newList;
        } else {
          this.maids = this.fullMaids;
        }
      }
    });
    modal.present();
  }
}
