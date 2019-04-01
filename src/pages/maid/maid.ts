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
  searchData;

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
      console.log("ANyOneCome Here");
      this.itemsRef = this.afd
        .list("maids", ref =>
          ref.orderByChild("companyId").equalTo(this.companyId)
        );
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
      obj: this.searchData
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
        console.log(data);
        // search_age_start;
        // search_age_end;
        // search_height_start;
        // search_height_end;
        // search_weight_start;
        // search_weight_end;
        
        //If no input is enter, return full List 
        // if(data.height == null && data.weight == null
        //   && data.age == null && data.skillList.length==0
        //   && data.country==null){
        //     this.maids = this.fullMaids;
        // }else{
          var newList = new Array<any>();
          for (var i in this.fullMaids) {
            var otherFound = false;
            if (parseInt(data.search_weight_start) <= parseInt(this.fullMaids[i].weight )
              && parseInt(this.fullMaids[i].weight) <=parseInt(data.search_weight_end)
              && parseInt(data.search_height_start) <= parseInt(this.fullMaids[i].height )
              && parseInt(this.fullMaids[i].height) <=parseInt(data.search_height_end)  
              && parseInt(data.search_age_start) <= parseInt(this.fullMaids[i].age )
              && parseInt(this.fullMaids[i].age) <=parseInt(data.search_age_end)
              && parseInt(this.fullMaids[i].working_exp_yr) >= parseInt(data.search_work_exp)) {
              otherFound = true;
            }else{
              otherFound = false;
            }
            var countryFound = false;
            if(data.country!=null){
              for (var k in data.country) {
                if(this.fullMaids[i].country==data.country[k]){
                  countryFound = true;
                  break;
                }
              }
            }else{
              countryFound = true;  
            }

            var religionFound = false;
            if(data.religion!=null){
              for (var k in data.religion) {
                if(this.fullMaids[i].religion==data.religion[k]){
                  religionFound = true;
                  break;
                }
              }
            }else{
              religionFound = true;  
            }

            var skillFound = true;
            for (var j in data.skillList) {
              if (this.fullMaids[i].skills.includes(data.skillList[j])) {
                skillFound = true;
              }else{
                skillFound = false;
              }
            }
            
            if(skillFound && otherFound && countryFound && religionFound) newList.push(this.fullMaids[i]);
          }
          this.maids = newList;
        this.searchData = data;
      }
    });
    modal.present();
  }
}
