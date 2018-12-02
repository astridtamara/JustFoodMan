import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestoDetailsPage } from './resto-details';

@NgModule({
  declarations: [
    RestoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestoDetailsPage),
  ],
})
export class RestoDetailsPageModule {}
