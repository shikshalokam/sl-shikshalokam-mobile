import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Platform, NavController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

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
    private platform: Platform, private alertController: AlertController,
    private splashScreen: SplashScreen, private toastController: ToastController,
    private statusBar: StatusBar,
    // public firebaseNative: Firebase
  ) {
    this.backButtonEvent();
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

      this.platform.backButton.subscribeWithPriority(0, () => {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        console.log(s, "segment");
        this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
          console.log("1", this.router.url);
          if (this.router.url == '/app-content/Samiksha' || this.router.url == '/app-content/Bodh' || s[0].path == 'top-contents') {
            await this.router.navigate(['/dashboard-chart']);
          } else if (this.router.url == '/dashboard-chart') {
            await this.router.navigate(['/home']);
          }
          else if (this.router.url === '/home') {
            if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
              this.lastTimeBackPress = new Date().getTime();
              this.presentAlertConfirm();
            }
            else {
              navigator['app'].exitApp();
            }
          }
        });
      });


      // this.platform.backButton.subscribeWithPriority(9999, () => {
      //   if (this.router.url == '/about' || this.router.url == '/home') {
      //     this.closeAppPopUP();
      //     }else {

      //     }
      //   })
    });

  }


  backButtonEvent() {
    console.log("back pressed");

  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }








  // exit from  app
  async closeAppPopUP() {
    const alert = await this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary, custom-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          cssClass: 'secondary, custom-btn',
          text: 'Close app',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }





}
