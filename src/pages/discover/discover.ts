import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {

  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController) {
    this.openResto();
  }

  // Display selected restaurant
  openResto(id: string) {
    this.navCtrl.push("RestoDetailsPage", {
      data: id
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.openResto();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
