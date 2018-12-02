import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-random-result",
  templateUrl: "random-result.html"
})
export class RandomResultPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RandomResultPage");
  }

  // Display selected restaurant
  openResto() {
    this.navCtrl.push("RestoDetailsPage");
  }
}
