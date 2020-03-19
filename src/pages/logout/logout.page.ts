import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppConfigs } from "../../app/app.config";
import { AppConstants } from '../../app/app.constants';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { LoginService } from '../../services/login/login.service';
import { CurrentUserProvider } from '../../services/current-user/current-user';
import { Storage } from '@ionic/storage';
import { AlertUtil } from '../../utils/alert.util';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})

export class LogoutPage implements OnInit {

  private auth_url: any;
  private token_url: any;
  private username: string;
  private password: string;
  private sl_state: string;

  constructor(  private http: Http, public alertUtil: AlertUtil,
                private storage: Storage, private router: Router,
                private loginService: LoginService, private events: Events,
                private currentUser: CurrentUserProvider ) {
    if (localStorage.getItem("token") == null) {
        this.alertUtil.errorMessageToast("You have been logged out already!");
        this.backHome();
    }
  }

  ngOnInit() {
    this.auth_url = AppConfigs.app_url + AppConfigs.keyCloak.auth_path + AppConfigs.clientId + "&redirect_uri=" + AppConfigs.keyCloak.redirection_url;
    this.token_url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken;
    this.doLogout();
  }

  public backHome() {
      this.router.navigateByUrl('/home');
  }

  public doLogout() {
    this.loginService.doLogout().then(success => {
      this.loginService.loggedIn('false');
      this.events.publish(AppConstants.EVENT_SUNBIRD_AUTH);
      this.reLoginAlert();
      this.backHome();
    }).catch(error => {
        this.backHome();
    })
  }

  private reLoginAlert() {
      this.currentUser.deactivateActivateSession(true);
  }

}
