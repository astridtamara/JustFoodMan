import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  NavParams
} from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../service/AuthService";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-create-status",
  templateUrl: "create-status.html"
})
export class CreateStatusPage {
  reviewForm: FormGroup;
  statusList: AngularFireList<any>;
  statuses: Observable<any[]>;

  uid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public afDatabase: AngularFireDatabase,
    public viewCtrl: ViewController
  ) {
    this.uid = this.authService.getActiveUser()
      ? this.authService.getActiveUser().uid
      : "NKBBtGDJcYSHRZqJs1zO0sGt4kh1";
    this.statusList = afDatabase.list("/statuses");
    this.statuses = this.statusList.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateStatusPage");
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.reviewForm = new FormGroup({
      restaurant: new FormControl(null, Validators.required),
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
      restoID: data.restaurant,
      rating: data.rating,
      description: data.review,
      date: new Date().toISOString()
    });
    this.viewCtrl.dismiss();
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
