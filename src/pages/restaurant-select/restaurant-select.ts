import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Restaurant } from "../../data/restaurant.interface";

@IonicPage()
@Component({
  selector: "page-restaurant-select",
  templateUrl: "restaurant-select.html"
})
export class RestaurantSelectPage {
  selectedResto: { id: string; name: string } = { id: "", name: "" };

  resturantList: AngularFireList<any>;
  restaurants: any;

  searchList: Restaurant[];
  filterList: Restaurant[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public afDatabase: AngularFireDatabase
  ) {
    this.resturantList = afDatabase.list("/restaurant");
    this.restaurants = this.resturantList.valueChanges();
    this.restaurants.subscribe(data => {
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

  changeSelected(id: string, name: string) {
    this.selectedResto = { id, name };
  }

  selectResto() {
    this.viewCtrl.dismiss(this.selectedResto);
  }
}
