import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { AuthService } from "../../service/AuthService";

import { Restaurant } from "../../data/restaurant.interface";

@IonicPage()
@Component({
  selector: "page-random",
  templateUrl: "random.html"
})
export class RandomPage {
  latitude: number = -6.255148;
  longitude: number = 106.615387;

  favoriteList: AngularFireList<any>;
  currentUser: string;

  searchQuery: string = "";
  resturantList: AngularFireList<any>;
  restaurants: any;

  totalRestaurants: number = 0;

  searchList: Restaurant[];
  filterList: Restaurant[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
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
      this.totalRestaurants = data.length;
    });

    this.favoriteList = this.afDatabase.list(
      "/favorites/" + this.currentUser + "/restaurants"
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RandomPage");
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

  onRandomStart() {
    let random = Math.floor(Math.random() * this.totalRestaurants);
    console.log(random);
    this.navCtrl.push("RandomResultPage", {
      data: this.filterList[random]
    });
  }

  parseScore(totalPoint, totalPost) {
    return (parseFloat(totalPoint) / parseFloat(totalPost)).toFixed(2);
  }
}
