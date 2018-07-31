import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from "../about/about";
import { CollectionPage } from "../collection/collection";
import { SettingPage } from "../setting/setting";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = CollectionPage;
  tab4Root = SettingPage;

  constructor() {}
}
