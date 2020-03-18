import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../services/api/api';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ProgramsService } from '../programs/programs.service';
import { AppContentService } from '../app-content/app-content.service';
import { AlertUtil } from '../../utils/alert.util';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})

export class RolesPage implements OnInit {
  private showSkeleton: boolean = true;
  private roles;
  private skeletons = [{}, {}, {}, {}, {}, {}, {}];
  highcharts = Highcharts;
  constructor(private storage: Storage, private router: Router, private api: ApiProvider,
    private programsService: ProgramsService, private activatedRoute: ActivatedRoute,
    private alertUtil: AlertUtil, private appContentService: AppContentService) { }

  ngOnInit() {
    this.getRoles()
  }

  // Get roles
  public getRoles() {
    this.storage.get(AppConstants.STORAGE_USER_TOKENS).then(data => {
      this.api.refreshToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set(AppConstants.STORAGE_USER_TOKENS, userTokens).then(usertoken => {
            this.showSkeleton = true;
            this.appContentService.getRoles(userTokens.access_token).subscribe((data: any) => {
              this.showSkeleton = false;
              if (data.result.length) {
                this.roles = data.result;
              }
              this.showSkeleton = false;
            }, error => {
              this.showSkeleton = false;
            })
          }, error => {
            this.showSkeleton = false;
          })
        }
      })
    })
  }

  // get entity list
  public getEntityList(id, type, group) {
    if (navigator.onLine) {
      if (group[0]) {
        this.router.navigate(['/entities', id, type, group[0]]);
      } else {
        group[0] = '';
        this.router.navigate(['/programs', id, type, group[0]]);
      }
    } else {
      this.alertUtil.errorMessageToast('Check your internet connection.');
    }
  }
}
