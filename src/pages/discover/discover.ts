import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {
  restaurantList: AngularFireObject<any>
  restaurant:any
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    this.restaurantList = db.object('/restaurant/rest_1');
    this.restaurant = this.restaurantList.valueChanges();
  }

  // Display selected restaurant
  openResto(id) {
    id='rest_1';
    console.log(id);
    this.navCtrl.push("RestoDetailsPage",{
      data:id
    });
  }
}
