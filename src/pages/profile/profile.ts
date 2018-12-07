import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase,  AngularFireList  } from 'angularfire2/database';
import { Observable } from "rxjs-compat/Observable";
import { AuthService } from "../../service/AuthService";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profileRef:AngularFireList<any>;
  profile: Observable<any[]>;

  constructor(public navCtrl: NavController, public authService: AuthService, public afDatabase: AngularFireDatabase) {
      this.profileRef = afDatabase.list('/users');
      this.profile = this.profileRef.valueChanges();
    }

  ionViewDidLoad(){
  }

  onEditProfile() {
    this.navCtrl.push("ProfileEditPage");
  }

  onLogOut(){
    this.authService.logOut();
  }

}
