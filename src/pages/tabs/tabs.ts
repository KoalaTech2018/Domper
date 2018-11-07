import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { MaidPage } from "../maid/maid";
import { CollectionPage } from "../collection/collection";
import { SettingPage } from "../setting/setting";

import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  @ViewChild(Tabs)
  tabs: Tabs;

  tab1Root = HomePage;
  tab2Root = MaidPage;
  tab3Root = CollectionPage;
  tab4Root = SettingPage;
  tabParams = {};

  countAddedColection(){
    // window.localStorage.setItem("countAddedColection", "");
    return window.localStorage.getItem("countAddedColection") != null
      ? window.localStorage.getItem("countAddedColection")
      : ""
  }

  

  //Used to Pass parameters to other tabs
  // constructor(private events: Events) {
  //   events.subscribe('change-tab', (tab, obj) => {
  //     this.tabParams = obj;
  //     this.tabs.select(tab);
  //   });
  // }
}
