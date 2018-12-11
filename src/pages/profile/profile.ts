import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../service/AuthService";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";

import { Account } from "../../data/account.interface";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profileObject: AngularFireObject<any>;
  profile: any;

  profileData: Account;

  activeUser: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.activeUser = this.authService.getActiveUser().uid;
    this.profileObject = db.object("/users/" + this.activeUser);
    this.profile = this.profileObject.valueChanges();
    this.profile.subscribe(data => {
      this.profileData = data;
    });
  }

  onEditProfile() {
    console.log(this.profileData);
    this.navCtrl.push("ProfileEditPage", { profile: this.profileData });
  }

  onLogOut() {
    this.authService.logOut();
  }
}
