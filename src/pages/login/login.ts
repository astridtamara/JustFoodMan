import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { TabsPage } from "../tabs/tabs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";

import Swal from "sweetalert2";

@IonicPage()
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
    public authService: AuthService
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
        Swal("Oops", error.message, "error");
      });
  }

  onRegister() {
    this.navCtrl.push("RegisterPage");
  }

  onForgotPassword() {
    Swal({
      title: "Forgot Password",
      text:
        "Please enter your email below. We will send a password reset link to your email.",
      input: "email",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: email => {
        this.authService.resetPassword(email);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal(
          "Please check your email",
          "We have sent a password reset link to your email",
          "success"
        );
      }
    });
  }
}
