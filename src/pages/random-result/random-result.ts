import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { AuthService } from "../../service/AuthService";
import { Restaurant } from "../../data/restaurant.interface";

@IonicPage()
@Component({
  selector: "page-random-result",
  templateUrl: "random-result.html"
})
export class RandomResultPage {
  data: Restaurant;

  favoriteList: AngularFireList<any>;
  currentUser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDatabase: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.data = this.navParams.get("data");

    this.favoriteList = this.afDatabase.list(
      "/favorites/" + this.currentUser + "/restaurants"
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RandomResultPage");
  }

  addFavorite(restoID: string) {
    this.favoriteList.update(restoID, {
      id: restoID
    });
  }

  removeFavorite(restoID: string) {
    this.favoriteList.remove(restoID);
  }

  // Display selected restaurant
  openResto() {
    this.navCtrl.push("RestoDetailsPage", { data: this.data.id });
  }

  parseScore(totalPoint, totalPost) {
    return (parseFloat(totalPoint) / parseFloat(totalPost)).toFixed(2);
  }
}
