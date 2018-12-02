import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomResultPage } from './random-result';

@NgModule({
  declarations: [
    RandomResultPage,
  ],
  imports: [
    IonicPageModule.forChild(RandomResultPage),
  ],
})
export class RandomResultPageModule {}
