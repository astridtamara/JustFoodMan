import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  UrlSerializer
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/AuthService";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import firebase from "firebase";
import { Platform, ActionSheetController } from "ionic-angular";
import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  profileEditForm: FormGroup;
  profiles: AngularFireObject<any>;
  profile: any;

  // tes:string="willy abc";
  // tes2:string="willy@abc.com";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase
  ) {
    this.profiles = afDatabase.object("/users/-LT8NJlLAiospnNKQOut");
    this.profile = this.profiles.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileEditPage");
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    //this.profile.email = this.navParams.get('email');

    console.log("initializeForm");
    this.profileEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl(null),
      newpassword: new FormControl(null),
      confirmpassword: new FormControl(null)
    });
  }
  //kesh, nanya lg dong
  onProfileEdit() {
    console.log("onProfileEdit");

    var user = firebase.auth().currentUser;
    var name, email, password;

    const update = this.afDatabase.list("/users");
    update.update("-LT8NJlLAiospnNKQOut", {
      name: this.profileEditForm.value.name,
      email: this.profileEditForm.value.email
    });
  }

  onPictureEdit() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Select Picture Source",
      buttons: [
        {
          text: "Load from Gallery",
          handler: () => {
            console.log("Load from Gallery");
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            console.log("Use Camera");
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
}
