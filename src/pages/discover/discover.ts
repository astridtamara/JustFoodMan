import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Restaurant } from "../../data/restaurant.interface";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {
  searchQuery: string = "";
  resturantList: AngularFireList<any>;
  restaurants: any;

  searchList: Restaurant[];
  filterList: Restaurant[];

  constructor(
    public navCtrl: NavController,
    public afDatabase: AngularFireDatabase
  ) {
    this.resturantList = afDatabase.list("/restaurant");
    this.restaurants = this.resturantList.valueChanges().subscribe(data => {
      this.searchList = data;
      this.filterList = data;
    });
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
}
