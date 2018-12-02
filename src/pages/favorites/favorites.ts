import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

  constructor(public navCtrl: NavController) {

  }

  // Display selected restaurant
  openResto() {
    this.navCtrl.push("RestoDetailsPage");
  }
}
