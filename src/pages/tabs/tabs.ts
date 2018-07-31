import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MaidPage } from "../maid/maid";
import { CollectionPage } from "../collection/collection";
import { SettingPage } from "../setting/setting";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = MaidPage;
  tab3Root = CollectionPage;
  tab4Root = SettingPage;

  constructor() {}
}
