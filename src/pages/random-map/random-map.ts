import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { Geolocation } from "@ionic-native/geolocation";
import { normalizeURL } from "ionic-angular";
import { PlacesProvider } from "../../providers/places";
import { File, FileError, Entry } from "@ionic-native/file";

import { Place } from "../../models/place";
declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-random",
  templateUrl: "random.html"
})
export class RandomMapPage {
  places: Place[];
  location: Location = {
    lat: 40.7624,
    long: -73.97598
  };

  locationIsSet = false;

  imageURL = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private geoLocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private placesProvider: PlacesProvider,
    private file: File
  ) {}

  onSubmit(form: NgForm) {
    this.placesProvider.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageURL
    );
    form.reset();
    this.location = {
      lat: 40.7624,
      long: -73.97598
    };
    this.imageURL = "";
    this.locationIsSet = false;
  }

  onOpenMap() {
    var modal = null;
    if (this.locationIsSet) {
      modal = this.modalCtrl.create("SetLocationPage", {
        location: this.location,
        marker: this.location
      });
    } else {
      modal = this.modalCtrl.create("SetLocationPage", {
        location: this.location
      });
    }

    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: "Getting your location..."
    });

    loader.present();

    this.geoLocation
      .getCurrentPosition()
      .then(location => {
        loader.dismiss();
        this.location.lat = location.coords.latitude;
        this.location.long = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(error => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not get location",
            duration: 2500
          })
          .present();
        console.log(error);
      });
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create("PlacePage", {
      place: place,
      index: index
    });
    modal.present();

    modal.onDidDismiss(() => {
      this.places = this.placesProvider.loadPlaces();
    });

    //TODO: reload places after modal dismiss
  }
}
