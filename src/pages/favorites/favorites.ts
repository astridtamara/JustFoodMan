import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AuthService } from "../../service/AuthService";

@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
  favoriteList: AngularFireList<any>;
  favorites: any;
  currentUser: any;

  constructor(
    public afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService
  ) {
    this.currentUser = authService.getActiveUser().uid;
    this.favoriteList = this.afDatabase.list(
      "/favorites/" + this.currentUser + "/restaurants"
    );
    this.favorites = this.favoriteList.snapshotChanges().map(snapshots =>
      snapshots.map(data => ({
        data: this.afDatabase
          .object("restaurant/" + data.payload.val().id)
          .valueChanges()
      }))
    );
  }

  // Display selected restaurant
  openResto(restoID: string) {
    this.navCtrl.push("RestoDetailsPage", { data: restoID });
  }

  removeFavorite(restoID: string) {
    this.favoriteList.remove(restoID);
  }
}
