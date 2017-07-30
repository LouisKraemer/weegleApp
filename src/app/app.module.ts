import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddUserPage } from '../pages/add-user/add-user';
import { ModifyModalPage } from '../pages/modify-modal/modify-modal';
import { StatsPage } from '../pages/stats/stats';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { FilterPipe } from '../pipes/filter/filter';

export const firebaseConfig = {
  apiKey: "AIzaSyAbaDCrgLsPq7TiGFSy2JkovoFyeQcCJFs",
  authDomain: "mariage-6c200.firebaseapp.com",
  databaseURL: "https://mariage-6c200.firebaseio.com",
  projectId: "mariage-6c200",
  storageBucket: "mariage-6c200.appspot.com",
  messagingSenderId: "508632744604"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddUserPage,
    ModifyModalPage,
    StatsPage,
    SearchPipe,
    SortPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddUserPage,
    ModifyModalPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
