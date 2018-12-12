import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavController,
  NavParams
} from "ionic-angular";

import { TabsPage } from "../tabs/tabs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  resultReset: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        this.presentAlert("Oops", error.message);
      });
  }

  onRegister() {
    this.navCtrl.setRoot("RegisterPage");
  }

  onForgotPassword() {
    let alert = this.alertCtrl.create({
      title: "Forgot Password",
      message:
        "Please enter your email below. We will send a password reset link to your email.",
      inputs: [
        {
          name: "email",
          placeholder: "Enter you email",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirm",
          handler: data => {
            this.authService.resetPassword(data.email).then(() => {
              this.presentAlert(
                "Email sent!",
                "We have sent a password reset link to your email."
              );
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ["Dismiss"]
    });
    alert.present();
  }
}
