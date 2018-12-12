import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
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
  favoriteList: AngularFireList<any>;

  statusList: AngularFireList<any>;
  statuses: Observable<any[]>;

  restaurantObject: AngularFireObject<any>;
  restaurantDetail: any;

  currentUser: any;

  isFavorite: boolean = false;
  selectedRestaurantId: string;
  selectedRestaurantName: string;

  newFavorite: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public authService: AuthService,
    public modalCtrl: ModalController
  ) {
    this.currentUser = this.authService.getActiveUser().uid;
    this.selectedRestaurantId = navParams.get("data");
    this.restaurantObject = db.object(
      "/restaurant/" + this.selectedRestaurantId
    );
    this.restaurantDetail = this.restaurantObject
      .snapshotChanges()
      .map(data => {
        this.selectedRestaurantName = data.payload.val().name;
        return {
          ...data.payload.val(),
          favorite: this.db
            .object(
              "favorites/" +
                this.currentUser +
                "/restaurants/" +
                this.selectedRestaurantId
            )
            .valueChanges()
        };
      });

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

    this.favoriteList = this.db.list(
      "/favorites/" + this.currentUser + "/restaurants"
    );
  }

  addFavorite() {
    this.favoriteList.update(this.selectedRestaurantId, {
      id: this.selectedRestaurantId
    });
  }

  removeFavorite() {
    this.favoriteList.remove(this.selectedRestaurantId);
  }

  createStatus() {
    let resto = {
      id: this.selectedRestaurantId,
      name: this.selectedRestaurantName
    };
    let profileModal = this.modalCtrl.create("CreateStatusPage", {
      resto
    });
    profileModal.present();
  }

  convertToNumber(input: any) {
    return parseFloat(input);
  }

  // Display selected account
  openAccount() {
    this.navCtrl.push("AccountDetailsPage");
  }
}
