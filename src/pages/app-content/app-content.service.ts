import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CurrentUserProvider } from '../../services/current-user/current-user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigs } from '../../app/app.config'
import { ApiProvider } from '../../services/api/api';

@Injectable({
  providedIn: 'root',
})
export class AppContentService {
  constructor(private api: ApiProvider, private http: HttpClient, public currentUser: CurrentUserProvider, private storage: Storage) {
  }
  public getRoles(data) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': data,
      'x-authenticated-user-token': data
    })
    return this.http.get(AppConfigs.api_url + '/assessment/api/v1/userExtension/getProfile/', { headers: httpHeaders })
  }
  public getEntities(token, values) {
    let httpHeaders = new HttpHeaders({
      'x-auth-token': token,
      'x-authenticated-user-token': token
    })
    return this.http.get(AppConfigs.api_url + '/assessment/api/v1/entities/list/' + values.id + '?type=' + values.group, { headers: httpHeaders })
  }

}
