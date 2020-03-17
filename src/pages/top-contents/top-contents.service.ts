import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CurrentUserProvider } from '../../services/current-user/current-user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigs } from '../../app/app.config'
import { ApiProvider } from '../../services/api/api';

@Injectable({ providedIn: 'root' })

export class TopContentService {

  private httpXAuthHeaders = new HttpHeaders({ 'x-auth-token': data });

  constructor(private api: ApiProvider, private http: HttpClient, public currentUser: CurrentUserProvider, private storage: Storage) {
    //  TODO:: intentionally kept empty.
  }

  // get top viewed content
  public getTopViewedContent(data) {
    return this.http.get(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/contentView', { headers: this.httpXAuthHeaders })
  }

   // get usage by content
   public getUsageByContent(data) {
    return this.http.get(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/usageByContent', { headers: this.httpXAuthHeaders })
  }

  // get downloaded content
  public getDownloadedContent(data, id) {
    let parameter = { "usr_id": id }
    return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/contentDownloadedByUser', parameter, { headers: this.httpXAuthHeaders })
  }

  // get enrolled courses
  public getEnrolledCourses(data, id) {
    let parameter = { "user_id": id }
    return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/shikshalokam/courseEnrollment', parameter, { headers: this.httpXAuthHeaders })
  }
}
