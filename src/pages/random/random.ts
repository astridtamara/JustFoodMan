import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: "page-random",
  templateUrl: "random.html"
})
export class RandomPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RandomPage");
  }
}
