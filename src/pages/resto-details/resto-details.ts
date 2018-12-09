import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-resto-details',
  templateUrl: 'resto-details.html',
})
export class RestoDetailsPage {
<<<<<<< HEAD

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
=======
  favorites:AngularFireList<any>;
  
  restaurant:AngularFireObject<any>;
  restaurantDetail:any;
  
  currentUser:any;
  
  isFavorite:boolean = false;
  selectedRestaurantId:any; // current Restaurant Id. diambil dari page yang klik resto detail (random, discover, favorites)

  newFavorite:any;
  constructor(public navCtrl: NavController, private restoService: RestoService, public navParams: NavParams, public db: AngularFireDatabase, public authService:AuthService) {
    this.favorites = db.list('/favorites');
    
    this.selectedRestaurantId = navParams.get('data'); //Terima restaurant ID dari discover/favorite
    
    this.restaurant = db.object('/restaurant/rest_1'); // ganti jadi parameter this.selectedRestaurantId
    this.restaurantDetail = this.restaurant.valueChanges();
  }

  ionViewWillEnter() {
    this.currentUser = this.authService.getActiveUser().uid;
>>>>>>> favorites, unfavorites, tapi belum bisa add restaurant to favoritePage
    console.log('ionViewDidLoad RestoDetailsPage');
  }

  ionViewDidLoad(){
    console.log(this.selectedRestaurantId);
  }

  // Display selected account
  openAccount() {
    this.navCtrl.push("AccountDetailsPage");
  }
<<<<<<< HEAD
=======

  checkFavorite(){
  }

  favorite(){
    return this.restoService.isFavorite2();
  }

  change(){
    if( this.restoService.isFavorite2() == false) { // Favorite
      
      this.favorites.update(this.currentUser + "/restaurants/" + 'rest_2', // param terakhir ganti jadi variable yang this.selectedRestaurantId
      { 
        id: 'rest_2' // ganti jadi this.selectedRestaurantId
      })
    }
    else { // Unfavorite
      const currentFavorite = this.db.list('/favorites/' + this.currentUser + '/restaurants/' + 'rest_2'); // rest_2 ganti jadi this.selectedRestaurantId
      currentFavorite.remove();
    }
    return this.restoService.change();
  }
>>>>>>> favorites, unfavorites, tapi belum bisa add restaurant to favoritePage
}
