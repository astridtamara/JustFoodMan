import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ReversePipe } from "./reverse/reverse";

@NgModule({
  declarations: [ReversePipe],
  imports: [IonicModule],
  exports: [ReversePipe]
})
export class PipesModule {}
