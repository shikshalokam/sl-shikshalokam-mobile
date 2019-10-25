import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CurrentUserProvider } from '../current-user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigs } from '../app.config'
import { ApiProvider } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class TopContentService {
  constructor(private api: ApiProvider, private http: HttpClient, public currentUser: CurrentUserProvider, private storage: Storage) {
    //  console.log(this.currentUser.curretUser, "value");
  }
  // get top viewed content
  public getTopViewedContent(data) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': data
    })
    return this.http.get(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/contentView', { headers: httpHeaders })
  }

   // get usage by content
   public getUsageByContent(data) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': data
    })
    return this.http.get(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/usageByContent', { headers: httpHeaders })
  }
  // get downloaded content
  public getDownloadedContent(data, id) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': data
    })
    let parameter = {
      "usr_id": id
    }
    return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/contentDownloadedByUser', parameter, { headers: httpHeaders })
  }

  // get enrolled courses
  public getEnrolledCourses(data, id) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': data
    })
    let parameter = {
      "user_id": id
    }
    return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/courseEnrollment', parameter, { headers: httpHeaders })
  }
}