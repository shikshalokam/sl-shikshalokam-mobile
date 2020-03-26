import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Platform, NavController, IonRouterOutlet, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './app.constants';
import { FCMService } from '../services/fcm/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild(NavController) nav: NavController;

  public isConnected;
  public loggedInUser;
  public toggleLogin: any = true;

  constructor(
    private router: Router, private location: Location, private translate: TranslateService,
    private platform: Platform, private alertController: AlertController,
    private splashScreen: SplashScreen, private toastController: ToastController,
    private statusBar: StatusBar, private events: Events,
    private fcmService: FCMService
  ) {
    translate.setDefaultLang(AppConstants.LANG_DEFAULT);
    translate.use(AppConstants.LANG_DEFAULT);
    statusBar.backgroundColorByHexString(AppConstants.BACKGROUND_COLOR_HOME);
    statusBar.styleDefault();
    splashScreen.hide();
    this.initializeApp();
  }

  // Initial call
  initializeApp() {
    this.events.subscribe(AppConstants.EVENT_SUNBIRD_AUTH, ()=>{
      this.toggleLogin = !this.toggleLogin;
    });

    this.platform.ready().then(() => {
      this.fcmService.initSequences();
      this.toggleLogin = (localStorage.getItem("token") == null);
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString(AppConstants.GENERAL_BACKGROUND_COLOR);
      this.splashScreen.hide();
      this.doBackAction();
    });
  }

  doBackAction() {
      this.platform.backButton.subscribeWithPriority(0, () => {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
          if ( this.router.url == '/login' || this.router.url == '/logout' ) {
            await this.router.navigate(['/home']);
          } else if (this.router.url == '/app-content/Samiksha' || this.router.url == '/app-content/Bodh' || s[0].path == 'top-contents') {
            await this.router.navigate(['/dashboard-chart']);
          } else if (this.router.url == '/dashboard-chart') {
            await this.router.navigate(['/home']);
          } else if (s[0].path == 'entities' || s[0].path == 'programs') {
            await this.router.navigate(['/app-content/Samiksha']);
          } else if (s[0].path == 'top-contents' && s[3].path == 'samiksha') {
            this.location.back();
          } else if (s[0].path == 'top-contents') {
            await this.router.navigate(['/app-content/Bodh']);
          } else if (this.router.url === '/home') {
            if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
              this.lastTimeBackPress = new Date().getTime();
              this.presentAlertConfirm();
            } else {
              navigator['app'].exitApp();
            }
          }
        });
      });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
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
