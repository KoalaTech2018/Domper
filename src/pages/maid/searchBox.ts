import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: "page-searchBox",
  templateUrl: "searchBox.html"
})
export class SearchBox {
  search_age_start;
  search_age_end;
  search_height_start;
  search_height_end;
  search_weight_start;
  search_weight_end;
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

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
    obj.search_age_start = this.search_age_start==""? "0": this.search_age_start;
    obj.search_age_end = this.search_age_end==""? "99": this.search_age_end;
    obj.search_height_start = this.search_height_start==""? "0": this.search_height_start;
    obj.search_height_end = this.search_height_end==""? "300": this.search_height_end;
    obj.search_weight_start = this.search_weight_start==""? "0": this.search_weight_start;
    obj.search_weight_end = this.search_weight_end==""? "300": this.search_weight_end;
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
