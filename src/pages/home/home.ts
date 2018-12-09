import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
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
    public afDatabase: AngularFireDatabase
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
    let uid = this.authService.getActiveUser()
      ? this.authService.getActiveUser().uid
      : "NKBBtGDJcYSHRZqJs1zO0sGt4kh1";
    const newUsers = this.statusList.push({});

    newUsers.set({
      id: newUsers.key,
      accountID: uid,
      restoID: "rest_2",
      rating: 5,
      description:
        "Ut egestas commodo tristique. Nam a consectetur libero, sed laoreet eros. Nulla at suscipit lectus. Quisque libero arcu, tempor vel enim sit amet, vulputate ultricies sem. Sed sit amet enim tortor. Proin nisi enim, dictum a ante eget, fermentum imperdiet velit.",
      date: new Date().toISOString()
    });
  }

  convertToNumber(input: any) {
    return parseFloat(input);
  }
}
