import { Component, OnInit } from '@angular/core';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Login } from '../login.service';
import { AppConfigs } from "../app.config";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private applications = [];
  private showNotifications: boolean = true;
  private redirect_url: string;
  private logout_url: string;
  private auth_url: string;
  private base_url: string;
  private dashboards = [
    {
      icon: '/assets/images/dash-small@3x.png',
      url: 'dash'
    },
    {
      icon: '/assets/images/journey-small@3x.png',
      url: 'org.shikshalokam.bodh'
    }
  ]
  constructor(private appLauncher: AppLauncher, private router: Router, private storage: Storage, public toastController: ToastController, private iab: InAppBrowser, private login: Login, ) {
    //this.token1 =  localStorage.getItem('mayBeToken');
    // this.menuCtrl.enable(true);
  }


  ngOnInit() {
    this.prepareJson();
  }

  public closeNotification() {
    this.showNotifications = !this.showNotifications;
  }

  // Prepare JSON for list of application
  public prepareJson() {
    this.applications = [
      {
        title: 'Experience Personalized Learning',
        appName: 'Bodh',
        icon: '/assets/images/bodh-d.png',
        id: 'org.shikshalokam.bodh'
      },
      {
        title: 'Identify Areas of Improvement',
        appName: 'Samiksha',
        icon: '/assets/images/samiksha-d.png',
        id: 'org.shikshalokam.samiksha'
      },
      {
        title: 'Create and Track Projects',
        appName: 'Unnati',
        icon: '/assets/images/unnati-d.png',
        id: 'org.shikshalokam.unnati'
      }
    ]
  }

  //Launch learner App
  public openApp(id) {
    // org.shikshalokam.app://community.shikshalokam.org/learn
    const options: AppLauncherOptions = {
      packageName: id,
    }
    this.appLauncher.canLaunch(options).then((canLaunch: boolean) => {
      if (canLaunch) {
        this.appLauncher.launch(options).then(() => {
        }, (err) => {
          if (navigator.onLine) {
            window.open('https://play.google.com/store/apps/details?id=' + id + '&hl=en', '_system')
          } else {
            this.errorMessage('Check your internet Connection.');
          }
        })
      } else {
        if (navigator.onLine) {
          window.open('https://play.google.com/store/apps/details?id=' + id + '&hl=en', '_system')
        } else {
          this.errorMessage('Check your internet Connection.');
        }
      }
    }, error => {
      if (navigator.onLine) {
        window.open('https://play.google.com/store/apps/details?id=' + id + '&hl=en', '_system')
      } else {
        this.errorMessage('Check your internet Connection.');
      }
    })
  }
  //  Navigate to dashboard if user logged in otherwise navigate to login
  public navigateToDashboard(url) {
    if (url == 'dash') {
      if (localStorage.getItem("token") != null) {
        this.router.navigateByUrl('/dashboard-chart');
      } else {
        if (navigator.onLine) {
          this.doLogin();
        } else {
          this.errorMessage('Check your internet Connection.');
        }
      }
    } else if (url) {
      this.errorMessage('Comming soon!');
    }
  }
  public open() {
    window.open("unnati:/about");
  }

  // Login
  public doLogin() {
    this.doOAuthStepOne().then(success => {
      this.login.doOAuthStepTwo(success).then(success1 => {
        this.login.checkForCurrentUserLocalData(success1);
        this.storage.set('userTokens', success1).then(data => {
          this.login.loggedIn('true');
          this.router.navigateByUrl('/dashboard-chart');
        });
        localStorage.setItem('token', success1);
        this.login.loggedIn('true');
        localStorage.setItem("networkStatus", 'true');
      }).catch(error1 => {
      })
    }).catch(error => {
    })
  }
  public doOAuthStepOne(): Promise<any> {
    this.base_url = AppConfigs.app_url;
    this.redirect_url = AppConfigs.keyCloak.redirection_url;
    this.auth_url = this.base_url + "/auth/realms/sunbird/protocol/openid-connect/auth?response_type=code&scope=offline_access&client_id=" + AppConfigs.clientId + "&redirect_uri=" +
      this.redirect_url;
    let that = this;
    return new Promise(function (resolve, reject) {
      let closeCallback = function (event) {
        reject("The Sunbird sign in flow was canceled");
      };
      let browserRef = (<any>window).cordova.InAppBrowser.open(that.auth_url, "_blank", "zoom=no");
      browserRef.addEventListener('loadstart', function (event) {
        if (event.url && ((event.url).indexOf(that.redirect_url) === 0)) {
          browserRef.removeEventListener("exit", closeCallback);
          let responseParameters = (((event.url).split("?")[1]).split("="))[1];
          if (responseParameters !== undefined) {
            this.show = false;
            browserRef.close();
            resolve(responseParameters);
          } else {
            reject("Problem authenticating with Sunbird");
          }
        }
      });
    });
  }
  // Error toast message
  async errorMessage(msg) {
    const toast = await this.toastController.create({
      message: msg, color: 'danger',
      duration: 2000
    });
    toast.present();
  }

}