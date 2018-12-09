import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RestoDetailsPage } from "./resto-details";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [RestoDetailsPage],
  imports: [IonicPageModule.forChild(RestoDetailsPage), PipesModule]
})
export class RestoDetailsPageModule {}
