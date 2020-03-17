import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../services/api/api';
import { AppContentService } from '../app-content/app-content.service';
import { AppConstants } from '../../../app/app.constants';
import { AlertUtil } from '../../utils/alert.util';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.page.html',
  styleUrls: ['./entities.page.scss'],
})
export class EntitiesPage implements OnInit {
  private params;
  private showSkeleton: boolean = false;
  private skeletons = [{}, {}, {}, {}, {}, {}, {}];
  private entities;
  private showNoMsgCard: boolean = false;
  constructor(private activatedRouter: ActivatedRoute,
    private router: Router, private appContentService: AppContentService,
    private storage: Storage, private api: ApiProvider, private alertUtil: AlertUtil) {
    activatedRouter.params.subscribe(params => {
      this.params = params;
      this.showSkeleton = true;
      if (navigator.onLine) {
        this.getEntities();
      } else {
        this.alertUtil.errorMessageToast('Check your internet connection.');
      }
    })
  }

  ngOnInit() {
  }
  //  Get entities based on user type
  public getEntities() {
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
            this.appContentService.getEntities(userTokens.access_token, this.params).subscribe((data: any) => {
              this.showSkeleton = false;
              if (data.result.length > 0) {
                this.entities = data.result;
                this.showNoMsgCard = false;
              } else {
                this.showNoMsgCard = true;
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

  // Get program lists based on entities
  public getProgramList(entityId, entityType, immediateSubEntityType) {
    if (navigator.onLine) {
      if (immediateSubEntityType == undefined) {
        immediateSubEntityType = '';
      }
      this.router.navigate(['/programs', entityId, entityType, immediateSubEntityType])
    } else {
      this.alertUtil.errorMessageToast('Check your internet connection.');
    }
  }
}
