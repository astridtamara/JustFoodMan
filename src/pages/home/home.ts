import { Component } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../service/AuthService";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  statusList: AngularFireList<any>;
  statuses: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public afDatabase: AngularFireDatabase,
    public modalCtrl: ModalController
  ) {
    this.statusList = afDatabase.list("/statuses", ref => {
      let query = ref.orderByChild("date");
      return query;
    });
    this.statuses = this.statusList.snapshotChanges().map(snapshots =>
      snapshots.map(data => ({
        data: this.afDatabase
          .object("statuses/" + data.payload.val().id)
          .valueChanges(), // HTML uses | async
        user: this.afDatabase
          .object("users/" + data.payload.val().accountID)
          .valueChanges(),
        restaurant: this.afDatabase
          .object("restaurant/" + data.payload.val().restoID)
          .valueChanges()
      }))
    );
  }

  onCreateStatus() {
    let profileModal = this.modalCtrl.create("CreateStatusPage");
    profileModal.present();
  }

  convertToNumber(input: any) {
    return parseFloat(input);
  }

  openRestaurant(restoID: string) {
    this.navCtrl.push("RestoDetailsPage", { data: restoID });
  }

  openAccount(accountID: string) {
    this.navCtrl.push("AccountDetailsPage", { data: accountID });
  }
}
