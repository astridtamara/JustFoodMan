import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-resto-details',
  templateUrl: 'resto-details.html',
})
export class RestoDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestoDetailsPage');
  }

  // Display selected account
  openAccount() {
    this.navCtrl.push("AccountDetailsPage");
  }
}
