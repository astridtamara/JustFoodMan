import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateStatusPage } from './create-status';

@NgModule({
  declarations: [
    CreateStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateStatusPage),
  ],
})
export class CreateStatusPageModule {}
