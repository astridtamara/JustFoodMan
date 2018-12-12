import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerForm: FormGroup;
  usersList: AngularFireList<any>;
  users: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public afDatabase: AngularFireDatabase
  ) {
    this.usersList = afDatabase.list("/users");
    this.users = this.usersList.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      nama: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  onBack() {
    this.navCtrl.setRoot(LoginPage);
  }

  onRegister() {
    let regis = this.authService.signUp(
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    regis.then(() => {
      let uid = this.authService.getActiveUser().uid;

      this.usersList.update(uid, {
        id: uid,
        email: this.registerForm.value.email,
        name: this.registerForm.value.nama,
        photo:
          "https://firebasestorage.googleapis.com/v0/b/justfoodman-umn.appspot.com/o/user-profile-picture.jpg?alt=media&token=3298f8f8-5a62-41db-b8d8-81bda52cf8f0", // url picture
        date: new Date().toISOString(),
        following: 0, // string id account
        followers: 0, // string id account
        posts: 0 // string id resto
      });
    });
    regis.catch(function(error) {
      alert(error);
    });
  }
}
