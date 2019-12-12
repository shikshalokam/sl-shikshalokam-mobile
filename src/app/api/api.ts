
import {  URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserProvider } from '../current-user';
import { AppConfigs } from '../app.config';
import {Login} from '../login.service';
import {Storage} from '@ionic/storage';
// import { App, AlertController } from 'ionic-angular'
// import { WelcomePage } from '../../pages/welcome/welcome';
// import { UtilsProvider } from '../utils/utils';
// import { AuthProvider } from '../auth/auth';
// import { NetworkGpsProvider } from '../network-gps/network-gps';
// import { SlackProvider } from '../slack/slack';
// import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
@Injectable()
export class ApiProvider {
  constructor(
    private storage :Storage,
    private http: Http,
    public currentUser: CurrentUserProvider,
   // private appCtrls: App, private utils: UtilsProvider,
    private login: Login,
    //private alertCntrl: AlertController,
    //private http: HttpClient,
   // private ngps: NetworkGpsProvider, private slack: SlackProvider
    ) {
  }

  errorObj = {
    "fallback": "User Details",
    "title": `Error Details`,
    "text": ``
  }

  errorTokenRetryCount: number = 0;

  refershToken(refreshToken) {
    const body = new URLSearchParams();
    //alert(this.currentUser.curretUser.refreshToken+"refreshToken");
    body.set('grant_type', "refresh_token");
    // body.set('refresh_token', this.currentUser.curretUser.refreshToken);
    body.set('client_id', AppConfigs.clientId);
    body.set('client_secret', AppConfigs.api_key);
    //  new Promise((resolve, reject) => {
      const obj = 'grant_type=refresh_token&refresh_token=' + refreshToken + "&client_id=" + AppConfigs.clientId;
      const url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken;
      const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      let options = new RequestOptions({headers: headers});
      return this.http.post(url, obj,options);
  }

  OnTokenExpired(url, payload, successCallback, errorCallback, requestType) {
    const apiUrl = AppConfigs.api_base_url + url;
    if (this.errorTokenRetryCount >= 3) {
      errorCallback({});
      const errorObject = { ...this.errorObj };
      errorObject.text = `API failed. URL: ${apiUrl}. Error  Details ${JSON.stringify(errorObject)}.Toke expired. Relogin enabled.`;
      //this.slack.pushException(errorObject);
      this.login.doLogout().then(success => {
        this.errorTokenRetryCount = 0;
        this.reLoginAlert();
      }).catch(error => {
      })
    } else {
    }
  }

  reLoginAlert() {
    this.currentUser.deactivateActivateSession(true);
  }

} 
