import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigs } from "../../app/app.config";
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
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

  constructor(private http: Http, public alertUtil: AlertUtil, private storage: Storage,
                    private router: Router, private loginService: LoginService) {
    if (localStorage.getItem("token") != null) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.auth_url = AppConfigs.app_url + AppConfigs.keyCloak.auth_path + AppConfigs.clientId + "&redirect_uri=" + AppConfigs.keyCloak.redirection_url;
    this.token_url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken
  }

  public login() {
    const obj = 'grant_type=password&username=' + this.username + '&scope=openid&password='+ this.password +'&sl_state='+ this.sl_state +'&client_id=' + AppConfigs.clientId;
    const url = AppConfigs.app_url + AppConfigs.keyCloak.getAccessToken;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({headers: headers});

    this.http.post(this.token_url, obj,options).subscribe((data: any) => {
      let resp = data.json();
      this.loginService.checkForCurrentUserLocalData(resp);
      this.storage.set('userTokens', resp).then(data => {
        this.loginService.loggedIn('true');
        this.router.navigateByUrl('/dashboard-chart');
      });
      localStorage.setItem('token', resp);
      this.loginService.loggedIn('true');
      localStorage.setItem("networkStatus", 'true');
    }, error => {
      this.alertUtil.errorMessageToast('Invalid Username / Password.');
    });
  }
}
