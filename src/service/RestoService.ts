import { Restaurant } from '../data/restaurant.interface';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class RestoService {
    private favoriteResto: Restaurant[] = [];
    private val : boolean = true;

    addRestoToFavorite(restaurant: Restaurant){
        this.favoriteResto.push(restaurant);
    }

    addRestoDb(restaurant: Restaurant) {
        return this.favoriteResto.push(restaurant);
    }

    removeRestoFromFavorites(restaurant: Restaurant) {
        this.favoriteResto.splice(this.favoriteResto.indexOf(restaurant),1);
    }

    getFavoriteResto(){
        return this.favoriteResto.slice();
    }

    isFavorite(restaurant: Restaurant) {
        return this.favoriteResto.indexOf(restaurant) >= 0;
    }

    isFavorite2(){
        return this.val;
    }

    change(){
        if(this.val==true){
            this.val=false;
          }
          else{
            this.val=true;
          }
          return this.val;
    }

}