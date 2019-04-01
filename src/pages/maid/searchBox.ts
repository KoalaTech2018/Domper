import { Component } from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';

@Component({
  selector: "page-searchBox",
  templateUrl: "searchBox.html"
})
export class SearchBox {
  searchObj;
  search_age;
  search_work_exp;
  search_religion;
  search_height;
  search_weight;
  search_country;

  isClick = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  skillSet = [
    "philippines",
    "indonesia",
    "othersCountry",

    "takeCareBaby",
    "takeCareKid",
    "takeCareElderly",
    "takeCarePets",
    "takeCareDisable",
    "medicalNursing",
    "useMedicine",

    "washCar",
    "drive",
    "houseCleaning",
    "Ironing",
    "applianceUsage",
    "groceryShopping",
    "mealPreparation",

    "chineseFood",
    "westernFood",
    "japaneseFood",
    "taiwanFood",
    "indianFood",
    "homeFood",

    "english",
    "cantonese",
    "mandarin"
  ];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.searchObj = navParams.get("obj");
    console.log(this.searchObj);
    if(this.searchObj==null){
      this.search_age = {
        upper:65,
        lower:18
      };
      this.search_weight = {
        upper:280,
        lower:0
      };
      this.search_height = {
        upper:280,
        lower:0
      };
      this.search_work_exp = 0;
  
    }else{
      this.search_country = this.searchObj.country;
      this.search_religion = this.searchObj.religion;
      this.search_age = {
        upper: this.searchObj.search_age_end,
        lower: this.searchObj.search_age_start
      };
      this.search_weight = {
        upper: this.searchObj.search_weight_end,
        lower: this.searchObj.search_weight_start
      };
      this.search_height = {
        upper: this.searchObj.search_height_end,
        lower: this.searchObj.search_height_start
      };
      this.search_work_exp = this.searchObj.search_work_exp;
      
      for(var i in this.searchObj.skillList){
        for(var j in this.skillSet){
          if(this.searchObj.skillList[i]==this.skillSet[j]){
            this.isClick[j] = true;
            break;
          }
        }
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  search() {

    var obj = { search_age_start: <number>(null), 
                search_age_end: <number>(null), 
                search_height_start: <number>(null), 
                search_height_end: <number>(null),
                search_weight_start: <number>(null),  
                search_weight_end: <number>(null), 
                search_work_exp: <number>(null), 
                country: [], 
                skillList: [],
                religion: []};
    console.log("From Search " + this.search_country);
    obj.search_age_start = this.search_age.lower;
    obj.search_age_end = this.search_age.upper;
    obj.search_height_start = this.search_height.lower;
    obj.search_height_end = this.search_height.upper;
    obj.search_weight_start = this.search_weight.lower;
    obj.search_weight_end = this.search_weight.upper;
    obj.search_work_exp = this.search_work_exp;
    obj.country = this.search_country;
    obj.religion = this.search_religion;

    var skillList = [];
    for (var i in this.isClick) {
      if (this.isClick[i]) {
        skillList.push(this.skillSet[i]);
      }
    }
    obj.skillList = skillList;
    console.log(obj);
    this.viewCtrl.dismiss(obj);
  }

  tagClick(num) {
    if (this.isClick[num]) this.isClick[num] = false;
    else this.isClick[num] = true;
  }
}
