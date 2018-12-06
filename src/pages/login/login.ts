import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { TabsPage } from "../tabs/tabs";
import { initializeApp } from "firebase";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  ngOnInit(){
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl(null, Validators.required)
    })

  }

  onLogin() {
    let sign_in = this.authService.signin(this.loginForm.value.email, this.loginForm.value.password);

    sign_in.catch(function(error){
      alert(error);
    })
    // this.navCtrl.setRoot(TabsPage);
  }

  onRegister() {
    this.navCtrl.push("RegisterPage");
  }
}
