
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



  // validateApiToken(): Promise<any> {
  //   console.log('callin validateApiToken');
  //   // this.http.setDataSerializer('json');
  //   // this.http.setRequestTimeout(300);
  //   return new Promise((resolve, reject) => {
  //     const userDetails = this.currentUser.getCurrentUserData();
  //     console.log((this.token.expires_in <= (Date.now() / 1000)),"(userDetails.exp <= (Date.now() / 1000))");
  //     if (this.token.expires_in <= (Date.now() / 1000)) {
  //       const body = new URLSearchParams();
  //       body.set('grant_type', "refresh_token");
  //       body.set('client_id', AppConfigs.clientId);
  //       body.set('refresh_token', this.token.refresh_token);
  //       const url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken;
  //         const headers = new Headers({
  //           'grant_type': "refresh_token",
  //           'client_id': AppConfigs.clientId,
  //           'refresh_token': this.token.refresh_token
  //         })
  //         let options = new RequestOptions({headers: headers});
  //         console.log("calling Post")
  //       this.http.post(url, body, options).subscribe(data => {
  //         let parsedData = JSON.parse(data['_body']);
  //         let userTokens = {
  //           accessToken: parsedData.access_token,
  //           refreshToken: parsedData.refresh_token,
  //           idToken: parsedData.id_token
  //         };
  //         this.currentUser.setCurrentUserDetails(userTokens);
  //         resolve()
  //       }, error =>{
  //         console.log(error);
  //           reject({ status: '401' });
  //       })
  //     } else {
  //       resolve();
  //     }
  //   })
  // }

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
      // this.refershToken().then(success => {
      //   if (requestType === 'post') {
      //     this.httpPost(url, payload, successCallback, errorCallback)
      //   } else {
      //     this.httpGet(url, successCallback, errorCallback)
      //   }
      // }).catch(error => {
      //   const errorObject = { ...this.errorObj };
      //   errorObject.text = `API failed. URL: ${apiUrl}. Error  Details ${JSON.stringify(error)}. Payload: ${JSON.stringify(payload)}.`;
      // //  this.slack.pushException(errorObject);
      //  // this.utils.openToast("Something went wrong. Please try again", 'Ok');
      //   errorCallback(error);
      //   this.login.doLogout().then(success => {
      //     this.reLoginAlert();
      //   }).catch(error => {
      //   })
      // }) 
    }
  }


//   httpPost(url, payload, successCallback, errorCallback) {
//     // let nav = this.appCtrls.getActiveNav();
//     this.validateApiToken().then(response => {
//       console.log(response, "REsponse");
//       //const gpsLocation = this.ngps.getGpsLocation()
//       const headers = new Headers({
//         'x-authenticated-user-token': this.token.access_token,
//        // 'gpsLocation': gpsLocation ? gpsLocation : '0,0',
//         'appVersion': AppConfigs.appVersion
//       })
//       let options = new RequestOptions({headers: headers});
//       const apiUrl = AppConfigs.api_base_url + url;
//      // this.http.setDataSerializer('json');
//       this.http.post(apiUrl, payload, options).subscribe(data => {
//           console.log(data, "data");
//         successCallback(data);
//       },error =>{
//         const errorDetails = JSON.parse(error['error']);
//         if (errorDetails.status === "ERR_TOKEN_INVALID") {
//           this.errorTokenRetryCount++;
//           this.OnTokenExpired(url, payload, successCallback, errorCallback, "post");
//         } else {
//         //  this.utils.openToast(error.message, 'Ok');
//           const errorObject = { ...this.errorObj };
//           errorObject.text = `API failed. URL: ${apiUrl}. Error  Details ${JSON.stringify(error)}. Payload: ${JSON.stringify(payload)}.`;
//           //this.slack.pushException(errorObject);
//         }
//       })
//     }).catch(error => {
//       this.OnTokenExpired(url, payload, successCallback, errorCallback, "post");
//     })
//   }

//  // private token ='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwZU9VQ3ZTVUR2ekprYzlyeXJVNTNWLXV6ME1nOFVCbk4tSzJfTmFpX2N3In0.eyJqdGkiOiJlNDQ4YzAxYS1mZTJlLTRiMDMtODU0YS1mNjk1Y2IyOTQ1YjIiLCJleHAiOjE1NjI3Mzg5ODIsIm5iZiI6MCwiaWF0IjoxNTYyNjUyNTgyLCJpc3MiOiJodHRwczovL2Rldi5zaGlrc2hhbG9rYW0ub3JnL2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJhZG1pbi1jbGkiLCJzdWIiOiI3NTE2NTIxYi0zYmU2LTQ0NWUtYmZlMy04YmNlZjg3ZjAwZGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJmODY4OTMwYi0zY2UzLTRhNjQtYmY4YS1iNDI2MTVjMGRkNDgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVzb3VyY2VfYWNjZXNzIjp7fSwibmFtZSI6IkFrc2hhcmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsYTFAc2hpa3NoYWxva2FtZGV2IiwiZ2l2ZW5fbmFtZSI6IkFrc2hhcmEiLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIjoibGExQHNoaWtzaGFsb2thbWRldi5kZXYifQ.VXgTS0ifBUwe139OKb7AFpDZy2dp4dVsZAby7qeVhaFX7HKEqgkuIUYPUeCD7BeJLvs2clZyCIdqtafUZDh9wElgSTYbc8F0i6t73EuNgfi4c3c_rufN-HLANSO8MmspKVu-P6FW22-CYGya5S9OpBw-C7v0J75a26EmFm5I7x_58Bd3X_KL9X8cmZ9w2Jlwpx6_figP24c9No_UGR-PZXv2iVF6dudeAqNSLNDWWBMh3iIw6ATuCRSqX6-VOTMBzabgN0mSDirS3JqxsZsP3eJFLNkclKWlmreF11fMm3biCWwAJKq8b9CzWx5V3PsKXA5xY_NlNLs7LQrkc9PhCg';
//     httpGet(url, successCallback, errorCallback) {
// console.log("URL = ", url, "successCallBack == ", successCallback);
//     this.validateApiToken().then(response => {
//       console.log(response, "REsponse");
//      // const gpsLocation = this.ngps.getGpsLocation()
//     //   const obj = {
//     //     'x-authenticated-user-token': this.currentUser.curretUser.accessToken,
//     //     //'gpsLocation': gpsLocation ? gpsLocation : '0,0',
//     //     'appVersion': AppConfigs.appVersion
//     //   }

//       const headers = new Headers({
//         'x-authenticated-user-token': this.token.access_token,
//        // 'gpsLocation': gpsLocation ? gpsLocation : '0,0',
//         'appVersion': AppConfigs.appVersion
//       })
//       let options = new RequestOptions({headers: headers});

//      // this.http.setDataSerializer('json');
//       const apiUrl = AppConfigs.api_base_url + url;
//       this.http.get(url, options).subscribe(data => {
//         successCallback(data);
//       },error=>{
//         const errorDetails = error['error'] ? JSON.parse(error['error']) : error ;
//         if (errorDetails.status === "ERR_TOKEN_INVALID") {
//           this.errorTokenRetryCount++;
//           this.OnTokenExpired(url, " ", successCallback, errorCallback, "get");
//         } else {
//           //this.utils.openToast(error.message, 'Ok');
//           const errorObject = { ...this.errorObj };
//           errorObject.text = `API failed. URL: ${apiUrl}. Error  Details ${JSON.stringify(error)}`;
//           //this.slack.pushException(errorObject);
//         }
//       })
//     }).catch(error => {
//       this.OnTokenExpired(url, " ", successCallback, errorCallback, "get");
//     })
//   }

  reLoginAlert() {
    this.currentUser.deactivateActivateSession(true);
  }

} 
