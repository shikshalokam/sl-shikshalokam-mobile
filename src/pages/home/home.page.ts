import { Component, OnInit } from '@angular/core';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AppConfigs } from "../../app/app.config";
import { AppConstants } from "../../app/app.constants";
import { Storage } from '@ionic/storage';
import { AlertUtil } from '../../utils/alert.util';

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
      url: AppConstants.BODH_NS
    }
  ];

  constructor(private appLauncher: AppLauncher, private router: Router,
    private storage: Storage, public alertUtil: AlertUtil,
    private iab: InAppBrowser, private loginService: LoginService ) {

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
        appName: AppConstants.APP_BODH,
        icon: '/assets/images/bodh-d.png',
        id: AppConstants.BODH_NS
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
        icon: '/assets/images/unnati-small@3x.png',
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
            this.alertUtil.errorMessageToast('Check your internet Connection.');
          }
        })
      } else {
        if (navigator.onLine) {
          window.open('https://play.google.com/store/apps/details?id=' + id + '&hl=en', '_system')
        } else {
          this.alertUtil.errorMessageToast('Check your internet Connection.');
        }
      }
    }, error => {
      if (navigator.onLine) {
        window.open('https://play.google.com/store/apps/details?id=' + id + '&hl=en', '_system')
      } else {
        this.alertUtil.errorMessageToast('Check your internet Connection.');
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
          this.alertUtil.errorMessageToast('Check your internet Connection.');
        }
      }
    } else if (url) {
      this.alertUtil.errorMessageToast('Coming Soon!');
    }
  }

  public open() {
    window.open("unnati:/about");
  }

  // Login
  public doLogin() {
    this.router.navigateByUrl('/login');
  }
}
