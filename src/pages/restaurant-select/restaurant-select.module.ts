import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantSelectPage } from './restaurant-select';

@NgModule({
  declarations: [
    RestaurantSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantSelectPage),
  ],
})
export class RestaurantSelectPageModule {}
