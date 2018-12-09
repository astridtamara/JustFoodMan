import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../service/AuthService";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  constructor(public navCtrl: NavController, public authService: AuthService) {}

  onEditProfile() {
    this.navCtrl.push("ProfileEditPage");
  }

  onLogOut(){
    this.authService.logOut();
  }

}
