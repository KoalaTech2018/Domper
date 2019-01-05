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
  search_nationality;

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

    var obj = { age: <number>(
        null
      ), height: <number>(
        null
      ), weight: <number>null, nationality: <String>null, skillList: [] };
    
    obj.age = this.search_age;
    obj.height = this.search_height;
    obj.weight = this.search_weight;
    obj.nationality = this.search_nationality;
    
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
