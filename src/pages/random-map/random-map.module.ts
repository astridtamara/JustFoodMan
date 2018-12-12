import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomMapPage } from './random-map';

@NgModule({
  declarations: [
    RandomMapPage,
  ],
  imports: [
    IonicPageModule.forChild(RandomMapPage),
  ],
})
export class RandomMapPageModule {}
