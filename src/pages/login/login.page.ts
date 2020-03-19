import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppConfigs } from "../../app/app.config";
import { AppConstants } from '../../app/app.constants';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { LoginService } from '../../services/login/login.service';
import { Storage } from '@ionic/storage';
import { AlertUtil } from '../../utils/alert.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  private auth_url: any;
  private token_url: any;
  private username: string;
  private password: string;
  private sl_state: string;

  constructor(  private http: Http, public alertUtil: AlertUtil,
                private storage: Storage, private router: Router,
                private iab: InAppBrowser, private login: LoginService,
                private events: Events ) {
    if (localStorage.getItem("token") != null) {
        this.alertUtil.errorMessageToast("You are logged in already!");
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.auth_url = AppConfigs.app_url + AppConfigs.keyCloak.auth_path + AppConfigs.clientId + "&redirect_uri=" + AppConfigs.keyCloak.redirection_url;
    this.token_url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken;
    this.doLogin();
  }

  public backHome() {
      this.router.navigateByUrl('/home');
  }

  // Login
  public doLogin() {
    this.doOAuthStepOne().then(success => {
      this.login.doOAuthStepTwo(success).then(success1 => {
        this.login.checkForCurrentUserLocalData(success1);
        this.storage.set('userTokens', success1).then(data => {
          this.login.loggedIn('true');
          this.events.publish(AppConstants.EVENT_SUNBIRD_AUTH);
          this.router.navigateByUrl('/dashboard-chart');
        });
        localStorage.setItem('token', success1);
        this.login.loggedIn('true');
        localStorage.setItem("networkStatus", 'true');
      }).catch(error1 => {
          this.alertUtil.errorMessageToast("Login Failed!");
          this.router.navigateByUrl('/home');
      });
    }).catch(error => {
        this.alertUtil.errorMessageToast("Login Failed!");
        this.router.navigateByUrl('/home');
    });
  }

  private doOAuthStepOne(): Promise<any> {
    let that = this;
    return new Promise(function (resolve, reject) {
      let closeCallback = function (event) {
        this.alertUtil.errorMessageToast("Please use the login button to login!");
        reject("Authentication Cancelled By User.");
      };
      let browserRef = (<any>window).cordova.InAppBrowser.open(that.auth_url, "_blank", "zoom=no,location=no,hideurlbar=yes,toolbar=no");
      browserRef.addEventListener('loadstart', function (event) {
        if (event.url && ((event.url).indexOf(AppConfigs.keyCloak.redirection_url) === 0)) {
          browserRef.removeEventListener("exit", closeCallback);
          let responseParameters = (((event.url).split("?")[1]).split("="))[1];
          if (responseParameters !== undefined) {
            this.show = false;
            browserRef.close();
            resolve(responseParameters);
          } else {
            this.alertUtil.errorMessageToast("Login Failed!");
            reject("Problem Authenticating With Sunbird");
          }
        }
      });
    });
  }
}
