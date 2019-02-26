import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: "page-searchBox",
  templateUrl: "searchBox.html"
})
export class SearchBox {
  search_age;
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
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
                search_weight_end: <number>null, 
                country: [], 
                skillList: [] };
    console.log("From Search " + this.search_country);
    obj.search_age_start = this.search_age.lower;
    obj.search_age_end = this.search_age.upper;
    obj.search_height_start = this.search_height.lower;
    obj.search_height_end = this.search_height.upper;
    obj.search_weight_start = this.search_weight.lower;
    obj.search_weight_end = this.search_weight.upper;
    obj.country = this.search_country;

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
