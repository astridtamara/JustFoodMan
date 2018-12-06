import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/AuthService';

import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit() {
    this.initializeForm();
  };

  initializeForm() {
    this.registerForm = new FormGroup({
      nama: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl(null, Validators.required)
    })
  };

  onRegister() {
    let regis = this.authService.signup(this.registerForm.value.email, this.registerForm.value.password);
    

    // activeUser.getToken()
    //   .then((token: string) => {
    //     this.storeDataUser(token, this.registerForm.value)
    //       .subscribe(
    //         () => {
    //           alert('Regis Success')
    //         },
    //         error => alert('Ini Salah Willy')
    //       )
    //   })
    regis.catch(function (error) {
      alert(error);
    })
  }

  storeDataUser(token, dataUSer) {
    const uid = this.authService.getActiveUser().uid;
    return this.http
      .put('https://justfoodman-umn.firebaseio.com/' + uid + '/dataUSer.json?auth=' + token, dataUSer)
  }

}
