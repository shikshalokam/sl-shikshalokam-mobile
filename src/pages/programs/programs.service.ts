import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CurrentUserProvider } from '../../services/current-user/current-user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigs } from '../../app/app.config'
import { ApiProvider } from '../../services/api/api';

@Injectable({
    providedIn: 'root',
})
export class ProgramsService {
    constructor(private api: ApiProvider, private http: HttpClient, public currentUser: CurrentUserProvider, private storage: Storage) {
    }
    public getPrograms(data, entity) {
        let httpHeaders = new HttpHeaders({
            'x-auth-token': data,
        })
        let param = {
            "entityId": entity.entityId, "entityType": entity.entityType, "immediateChildEntityType": entity.subType
        }
        return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/assessments/listPrograms/', param, { headers: httpHeaders })
    }
    public getEntities(token, values) {
        let httpHeaders = new HttpHeaders({
            'x-auth-token': token,
            'x-authenticated-user-token': token
        })
        return this.http.get(AppConfigs.api_url + '/assessment/api/v1/entities/list/' + values.id + '?type=' + values.type, { headers: httpHeaders })
    }
    //  get reports
    public getReports(token, value) {
        let httpHeaders = new HttpHeaders({
            'x-auth-token': token,
        })
        let subType: any = localStorage.getItem('subType');
        let entityType: any = localStorage.getItem('entityType');
        let entityId: any = localStorage.getItem('entityId');
        let data = {
            entityId: entityId,
            programId: value.prgrmId,
            solutionId: value.slnId,
            entityType: entityType,
            immediateChildEntityType: subType
        }
        return this.http.post(AppConfigs.api_url + '/dhiti/api/v1/assessments/entity', data, { headers: httpHeaders })
    }
}
