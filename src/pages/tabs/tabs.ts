import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { DiscoverPage } from '../discover/discover';
import { RandomPage } from '../random/random';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../service/AuthService';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = FavoritesPage;
  tab3Root = DiscoverPage;
  tab4Root = RandomPage;
  tab5Root = ProfilePage;

  constructor(private authService:AuthService) { }

  ionViewWillEnter() {
  }

}
