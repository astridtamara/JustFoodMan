import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { LoginPage } from "../pages/login/login";

import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { FavoritesPage } from "../pages/favorites/favorites";
import { DiscoverPage } from "../pages/discover/discover";
import { Random2Page } from "../pages/random2/random2";
import { ProfilePage } from "../pages/profile/profile";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireStorageModule } from "angularfire2/storage";

import { AuthService } from "../service/AuthService";
import { HttpModule } from "@angular/http";

import { PipesModule } from "../pipes/pipes.module";

const firebaseConfig = {
  apiKey: "AIzaSyBzyDTUM6D1Wh-LujHi06ZDPvm3KLJ45n0",
  authDomain: "justfoodman-umn.firebaseapp.com",
  databaseURL: "https://justfoodman-umn.firebaseio.com",
  projectId: "justfoodman-umn",
  storageBucket: "justfoodman-umn.appspot.com",
  messagingSenderId: "845038727096"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    FavoritesPage,
    DiscoverPage,
    Random2Page,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    FavoritesPage,
    DiscoverPage,
    Random2Page,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    File,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
