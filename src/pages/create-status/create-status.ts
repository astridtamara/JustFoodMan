import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  ViewController,
  LoadingController,
  ToastController,
  NavParams
} from "ionic-angular";

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../service/AuthService";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActionSheetController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

import * as Firebase from "firebase/app";
import { AngularFireStorage } from "angularfire2/storage";

@IonicPage()
@Component({
  selector: "page-create-status",
  templateUrl: "create-status.html"
})
export class CreateStatusPage {
  loader: any;

  reviewForm: FormGroup;
  statusList: AngularFireList<any>;
  statuses: Observable<any[]>;

  profileObject: AngularFireObject<any>;
  profile: any;

  uid: string;

  profileData: Account;

  photoURL: any = null;

  imgData: any = null;

  resto: { id: ""; name: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public afDatabase: AngularFireDatabase,
    public afStore: AngularFireStorage,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.uid = this.authService.getActiveUser().uid;

    this.profileObject = afDatabase.object("/users/" + this.uid);
    this.profile = this.profileObject.valueChanges();

    this.statusList = afDatabase.list("/statuses");
    this.statuses = this.statusList.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateStatusPage");
  }

  ngOnInit() {
    this.resto = this.navParams.get("resto") || { id: "", name: "" };
    this.initializeForm();
  }

  initializeForm() {
    this.reviewForm = new FormGroup({
      restaurant: new FormControl(this.resto.id, Validators.required),
      rating: new FormControl(1, Validators.required),
      review: new FormControl(null, Validators.required)
    });
  }

  setRating(rating: number) {
    this.reviewForm.get("rating").setValue(rating);
  }

  onSubmit() {
    let data = this.reviewForm.value;

    const newReview = this.statusList.push({});

    newReview.set({
      id: newReview.key,
      accountID: this.uid,
      restoID: this.resto.id,
      rating: data.rating,
      description: data.review,
      photo: this.photoURL,
      date: new Date().toISOString()
    });

    // increase total point
    this.afDatabase
      .object("restaurant/" + data.restaurant + "/totalPoint")
      .query.ref.transaction(balance => {
        return (balance += data.rating);
      });

    // increase total post
    this.afDatabase
      .object("restaurant/" + data.restaurant + "/totalPost")
      .query.ref.transaction(balance => {
        return (balance += 1);
      });

    // increase user total post
    this.afDatabase
      .object("users/" + this.uid + "/posts")
      .query.ref.transaction(balance => {
        return (balance += 1);
      });

    this.viewCtrl.dismiss();
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
        this.photoURL = base64Image;
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
    const filePath =
      "users/" + this.uid + "/" + new Date().toISOString() + ".png";
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
        this.photoURL = pic.snapshot.downloadURL;
        const update = this.afDatabase.list("/users");
        update.update(this.profileData.id, {
          photo: pic.snapshot.downloadURL
        });
        this.loader.dismiss();
      }
    );
  }

  openRestaurantSelect() {
    let selectModal = this.modalCtrl.create("RestaurantSelectPage");
    selectModal.onDidDismiss(data => {
      this.resto = data;
      this.reviewForm.get("restaurant").setValue(data.name);
    });
    selectModal.present();
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

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
