import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";

import { AuthService } from "../../service/AuthService";

@IonicPage()
@Component({
  selector: "page-resto-details",
  templateUrl: "resto-details.html"
})
export class RestoDetailsPage {
  favorites: AngularFireList<any>;

  statusList: AngularFireList<any>;
  statuses: Observable<any[]>;

  restaurantObject: AngularFireObject<any>;
  restaurantDetail: any;

  currentUser: any;

  isFavorite: boolean = false;
  selectedRestaurantId: any;

  newFavorite: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.selectedRestaurantId = navParams.get("data");
    this.restaurantObject = db.object(
      "/restaurant/" + this.selectedRestaurantId
    );
    this.restaurantDetail = this.restaurantObject
      .snapshotChanges()
      .map(data => ({
        ...data.payload.val(),
        favorite: this.db
          .object(
            "favorites/" +
              this.currentUser +
              "/restaurants/" +
              data.payload.val().id
          )
          .valueChanges()
      }));

    this.statusList = this.db.list("/statuses", ref => {
      let query = ref
        .orderByChild("restoID")
        .equalTo(this.selectedRestaurantId);
      return query;
    });
    this.statuses = this.statusList.snapshotChanges().map(snapshots =>
      snapshots.map(data => ({
        data: this.db
          .object("statuses/" + data.payload.val().id)
          .valueChanges(), // HTML uses | async
        user: this.db
          .object("users/" + data.payload.val().accountID)
          .valueChanges(),
        restaurant: this.db
          .object("restaurant/" + data.payload.val().restoID)
          .valueChanges()
      }))
    );
  }

  ionViewWillEnter() {
    this.currentUser = this.authService.getActiveUser().uid;
    console.log("ionViewDidLoad RestoDetailsPage");
  }

  updateFavorite(isFavorite: boolean) {
    if (isFavorite) {
      this.favorites.update(
        this.currentUser + "/restaurants/" + this.selectedRestaurantId,
        {
          id: this.selectedRestaurantId
        }
      );
    } else {
      // Unfavorite
      const currentFavorite = this.db.list(
        "/favorites/" +
          this.currentUser +
          "/restaurants/" +
          this.selectedRestaurantId
      );
      currentFavorite.remove();
    }
  }

  convertToNumber(input: any) {
    return parseFloat(input);
  }

  // Display selected account
  openAccount() {
    this.navCtrl.push("AccountDetailsPage");
  }
}
