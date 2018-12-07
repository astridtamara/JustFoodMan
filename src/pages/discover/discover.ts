import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {
  constructor(public navCtrl: NavController) {
    searchQuery: string = '';
    items: string[];
  }

  // Display selected restaurant
  openResto(id: string) {
    this.navCtrl.push("RestoDetailsPage", {
      data: id
    });
  }
}
