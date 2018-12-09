import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../service/AuthService";
import {
  AngularFireList,
  AngularFireDatabase,
  AngularFireObject
} from "angularfire2/database";
import { User } from "firebase";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profiles: AngularFireObject<any>;
  profile: any;
  tes: string = "kluar?";
  activeUser: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    db: AngularFireDatabase
  ) {
    this.profiles = db.object("/users/-LT8NJlLAiospnNKQOut");
    this.profile = this.profiles.valueChanges();
  }

  ionViewDidLoad() {
    console.log(this.authService.getActiveUser());
  }
  onEditProfile() {
    this.navCtrl.push("ProfileEditPage");
  }

  onLogOut() {
    this.authService.logOut();
  }
}
