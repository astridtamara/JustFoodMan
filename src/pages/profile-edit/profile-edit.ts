import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  ToastController,
  NavController,
  ActionSheetController,
  NavParams
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Camera, CameraOptions } from "@ionic-native/camera";

import * as Firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";

import { AuthService } from "../../service/AuthService";
import { Account } from "../../data/account.interface";

@IonicPage()
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  loader: any;

  profileEditForm: FormGroup;
  profileObject: AngularFireObject<any>;
  profile: any;

  profileData: Account;

  activeUser: any;

  imgData: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public afStore: AngularFireStorage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.activeUser = this.authService.getActiveUser().uid;
    this.profileObject = this.afDatabase.object("/users/" + this.activeUser);
    this.profile = this.profileObject.valueChanges();
  }

  ngOnInit() {
    this.profileData = this.navParams.get("profile");
    this.initializeForm();
  }

  initializeForm() {
    let { name, email } = this.profileData;
    this.profileEditForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl(null, Validators.required),
      newpassword: new FormControl(null, Validators.required),
      confirmpassword: new FormControl(null, Validators.required)
    });
  }

  onProfileEdit() {
    const update = this.afDatabase.list("/users");
    update.update(this.profileData.id, {
      name: this.profileEditForm.value.name,
      email: this.profileEditForm.value.email
    });
  }

  changePass(passwordNew) {
    this.afAuth.auth.currentUser
      .updatePassword(passwordNew)
      .then(() => {
        this.loader.dismiss();
        this.presentToast("Password has been changed successfully");
      })
      .catch(e => {
        console.log("err", e);
        this.loader.dismiss();
        this.presentToast(e.message);
      });
  }

  onPictureEdit() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Select Picture Source",
      buttons: [
        {
          text: "Load from Gallery",
          handler: () => {
            this.takePhoto(0);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePhoto(1);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(sourceType: number) {
    this.loading();
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.profileData.photo = base64Image;
        this.imgData = imageData;

        this.loader.dismiss();
        this.uploadImage();
      },
      err => {
        // Handle error
        this.loader.dismiss();
      }
    );
  }

  uploadImage() {
    if (!this.imgData) {
      return;
    }
    // Determine the path to the path users/uid
    const filePath = "users/" + this.activeUser + "/photo.png";
    const pic = this.afStore.storage
      .ref(filePath)
      .putString(this.imgData, "base64", { contentType: "image/png" });
    pic.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // Progress bar
      },
      error => {
        this.loader.dismiss();
      },
      () => {
        //Success
        this.profileData.photo = pic.snapshot.downloadURL;
        const update = this.afDatabase.list("/users");
        update.update(this.profileData.id, {
          photo: pic.snapshot.downloadURL
        });
        this.loader.dismiss();
      }
    );
  }

  loading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });

    toast.present();
  }
}
