import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { RestoService } from '../../service/RestoService';
import { Restaurant } from '../../data/restaurant.interface';
import { Http } from '@angular/http';
import { AuthService } from '../../service/AuthService';
 
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  restoCollection:Restaurant[];
  favoriteList:AngularFireList<any>;
  favorite: any;
  currentUser:any;

  constructor(public http: Http, private restoService: RestoService, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
    this.currentUser = authService.getActiveUser().uid;
    this.favoriteList = this.db.list('/favorites/'+this.currentUser+'/restaurants');
    this.favorite = this.favoriteList.valueChanges();
  }
 
  // Display selected restaurant
  openResto() {
    this.navCtrl.push("RestoDetailsPage");
  } 

  ionViewWillEnter(){
    this.restoCollection = this.restoService.getFavoriteResto();
  }

  onAddResto(restaurant:Restaurant){
    this.restoService.addRestoToFavorite(restaurant);
  }

  showResto(restaurant:Restaurant) {
    console.log(restaurant);
  }

  isFavorite(){
    return this.restoService.isFavorite2();
  }

  change(){
   return this.restoService.change();
  }
}
