import { Injectable } from '@angular/core';
import { AppConstants } from '../../app/app.constants';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({ providedIn: 'root' })

export class FCMService {

  constructor(private fcm: FCM) {
  }

  initSequences() {
    this.fcm.getToken().then(token => {
      console.log("getToken called");
      this.registerToken(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
        var parsedData = this.handleBody(data);
        this.pushToBodh(parsedData.title, parsedData.message);
      } else {
        console.log("Received in foreground");
        var parsedData = this.handleBody(data);
        this.pushToBodh(parsedData.title, parsedData.message);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("refresh token called");
      this.registerToken(token);
    });
  }

  handleBody(data) {
    console.log(data.body);
    var parsedData = data.body;
    if (typeof data.body == 'string') {
        parsedData = JSON.parse(data.body);
    }
    console.log(parsedData);
    console.log(parsedData.title);
    console.log(parsedData.message);
    return parsedData;
  }
  registerToken(token) {
    console.log(token);
    //TODO:: send to serverside and also remove the subscription below
    this.fcm.subscribeToTopic('POC-BODH-FCM');
  }

  private pushToBodh(type, msg) {
    let type_title = 'Announcement from Shikshalokam';

    if(type == AppConstants.PUSH_TYPE_MESSAGE_OF_THE_DAY) {
      type_title = 'Message Of the Day';
    } else if(type == AppConstants.PUSH_TYPE_MESSAGE_OF_THE_DAY) {
      type_title = 'News from Shikshalokam';
    }

    let appStarter = (window as any).startApp.set(
        { 'application' : AppConstants.BODH_NS },
        { 'pushtype' : type_title, 'pushmsg' : msg }
    ).start(function (r_msg) {
        console.log('starting Bodh app: ', r_msg);
      }, function (err) {
        console.log('Bodh app not installed', err);
      }
    );
  }

}
