import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: "page-discover",
  templateUrl: "discover.html"
})
export class DiscoverPage {

  searchQuery: string = '';
  itemList: AngularFireList<any> ;
  items: any;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase) {
    this.itemList = afDatabase.list("/restaurant");
    this.items = this.itemList.valueChanges();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // Display selected restaurant
  openResto(id: string) {
    this.navCtrl.push("RestoDetailsPage", {
      data: id
    });
  }
}
