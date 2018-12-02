import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { LoginPage } from "../pages/login/login";

import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { FavoritesPage } from "../pages/favorites/favorites";
import { DiscoverPage } from "../pages/discover/discover";
import { RandomPage } from "../pages/random/random";
import { ProfilePage } from "../pages/profile/profile";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";

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
    RandomPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    FavoritesPage,
    DiscoverPage,
    RandomPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth
  ]
})
export class AppModule {}
