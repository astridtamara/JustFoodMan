import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { AuthService } from "../../service/AuthService";

import { Restaurant } from "../../data/restaurant.interface";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {
  favoriteList: AngularFireList<any>;
  currentUser: string;

  searchQuery: string = "";
  resturantList: AngularFireList<any>;
  restaurants: any;

  searchList: Restaurant[];
  filterList: Restaurant[];

  constructor(
    public navCtrl: NavController,
    public afDatabase: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.currentUser = authService.getActiveUser().uid;

    this.resturantList = afDatabase.list("/restaurant");
    this.restaurants = this.resturantList.snapshotChanges().map(snapshots =>
      snapshots.map(data => ({
        ...data.payload.val(),
        isFavorite: this.afDatabase
          .object(
            "favorites/" +
              this.currentUser +
              "/restaurants/" +
              data.payload.val().id
          )
          .valueChanges()
      }))
    );

    this.restaurants.subscribe(data => {
      this.searchList = data;
      this.filterList = data;
    });

    this.favoriteList = this.afDatabase.list(
      "/favorites/" + this.currentUser + "/restaurants"
    );
  }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.filterList = this.searchList.filter(item => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.filterList = this.searchList;
    }
  }

  // Display selected restaurant
  openResto(id: string) {
    this.navCtrl.push("RestoDetailsPage", {
      data: id
    });
  }

  addFavorite(restoID: string) {
    this.favoriteList.update(restoID, {
      id: restoID
    });
  }

  removeFavorite(restoID: string) {
    this.favoriteList.remove(restoID);
  }
}
