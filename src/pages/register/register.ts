import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

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
      password: new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    let regis = this.authService.signUp(
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    regis.then(() => {
      this.authService
        .getActiveUser()
        .getIdToken()
        .then((token: string) => {
          const newUsers = this.usersList.push({});

          newUsers.set({
            id: newUsers.key,
            email: this.registerForm.value.email,
            name: this.registerForm.value.nama,
            photo: "", // url picture
            date: "",
            following: [], // string id account
            follower: [], // string id account
            favorites: [] // string id resto
          });
        });
    });
    regis.catch(function(error) {
      alert(error);
    });
  }
}
