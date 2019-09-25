import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AboutPage } from './about/about.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(NavController) nav: NavController;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  public isConnected;
  public loggedInUser;
  constructor(
    private router: Router,
   //  private fcm: FcmService,
    private platform: Platform,
    private splashScreen: SplashScreen, private toastController: ToastController,
    private statusBar: StatusBar,
    // public firebaseNative: Firebase
  ) {
    statusBar.backgroundColorByHexString('#2693ee');
    statusBar.styleDefault();
    splashScreen.hide();
    this.initializeApp();
  }

// Initial call
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#af4038');
      this.splashScreen.hide();
    });
  }





}
