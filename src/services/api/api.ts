
import {  URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserProvider } from '../current-user/current-user';
import { AppConfigs } from '../../app/app.config';
import { LoginService } from '../login/login.service';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Injectable()

export class ApiProvider {
  constructor(
    private storage :Storage,
    private http: Http,
    public currentUser: CurrentUserProvider,
    private loginService: LoginService
    ) {
  }

  errorObj = {
    "fallback": "User Details",
    "title": `Error Details`,
    "text": ``
  }

  errorTokenRetryCount: number = 0;

  refreshToken(refreshToken) {
    const body = new URLSearchParams();
    body.set('grant_type', "refresh_token");
    body.set('client_id', AppConfigs.clientId);
    body.set('client_secret', AppConfigs.api_key);
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
      this.loginService.doLogout().then(success => {
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
