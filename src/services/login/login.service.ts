import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppConfigs } from "../../app/app.config";
import { URLSearchParams , Http} from '@angular/http';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CurrentUserProvider } from '../current-user/current-user'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public emit = new Subject();
  redirect_url: string;
  logout_url: string;
  auth_url: string;
  base_url: string;
  logout_redirect_url: string;

  constructor(private http: Http, private currentUser: CurrentUserProvider) {
  }

  doLogin() {
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
          browserRef.close();
          let responseParameters = (((event.url).split("?")[1]).split("="))[1];
          if (responseParameters !== undefined) {
            resolve(responseParameters);
          } else {
            reject("Problem authenticating with Sunbird");
          }
        }
      });
    });
  }

  public loggedIn(user) {
    this.emit.next(user);
  }

  public getToken(data) {
    this.base_url = AppConfigs.app_url;
    this.redirect_url = AppConfigs.keyCloak.redirection_url;
    const body = new HttpParams();
    body.set('grant_type', "authorization_code");
    body.set('client_id', AppConfigs.clientId);
    body.set('code', data);
    body.set('redirect_uri', this.redirect_url);
    body.set('scope', "offline_access");
    return new Promise(resolve => {
      this.http.post(this.base_url + AppConfigs.keyCloak.getAccessToken, body)
        .subscribe((data: any) => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  checkForCurrentUserLocalData(tokens) {
    const loggedinUserId = this.currentUser.getDecodedAccessToken(tokens.access_token).sub;
    const currentUserId = this.currentUser.getCurrentUserData() ? this.currentUser.getCurrentUserData().sub : null;
    if (loggedinUserId === currentUserId || !currentUserId) {
      let userTokens = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        idToken: tokens.id_token,
        isDeactivated: false
      };
      this.currentUser.setCurrentUserDetails(userTokens);
    }
  }

  doLogout(): Promise<any> {
    return new Promise(function (resolve) {
      let logout_redirect_url = AppConfigs.keyCloak.logout_redirect_url;
      let logout_url = AppConfigs.app_url + "/auth/realms/sunbird/protocol/openid-connect/logout?redirect_uri=" + logout_redirect_url;
      let closeCallback = function (event) {
      };
      let browserRef = (<any>window).cordova.InAppBrowser.open(logout_url, "_blank", "hidden=yes");
      browserRef.addEventListener('loadstart', function (event) {
        if (event.url && ((event.url).indexOf(logout_redirect_url) === 0)) {
          browserRef.removeEventListener("exit", closeCallback);
          browserRef.close();
          resolve()
        }
      });

    });
  }



  doOAuthStepTwo(token: string): Promise<any> {

    return new Promise(resolve => {
      const body = new URLSearchParams();
      const params = 'grant_type=authorization_code&client_id='+AppConfigs.clientId+'&code='+token+'&redirect_uri='+AppConfigs.keyCloak.redirection_url+'&scope=offline_access'
      body.set('grant_type', "authorization_code");
      body.set('client_id', AppConfigs.clientId);
      body.set('code', token);
      body.set('redirect_uri', AppConfigs.keyCloak.redirection_url);
      body.set('scope', "offline_access");
      const url = AppConfigs.app_url  + AppConfigs.keyCloak.getAccessToken;
      this.http.post(url, body)
        .subscribe((data: any) => {
          let parsedData = JSON.parse(data._body);
          resolve(parsedData);
        }, error => {
          resolve(error);
        });
    });
  }
}
