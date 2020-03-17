import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertUtil } from '../../utils/alert.util';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../services/api/api';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { AppContentService } from './app-content.service';
import { AppConstants } from '../../../app/app.constants';
import { AlertUtil } from '../../../utils/alert.util';

@Component({
   selector: 'app-app-content',
   templateUrl: './app-content.page.html',
   styleUrls: ['./app-content.page.scss'],
})
export class AppContentPage implements OnInit {
   public appName;
   public title;
   public showSkeleton;
   public showNoMsgCard: boolean = false;
   private roles;
   private skeletons = [{}, {}, {}, {}, {}, {}, {}];
   constructor(private activatedRoute: ActivatedRoute,
        private appContentService: AppContentService,
        private router: Router,
        private storage: Storage, private api: ApiProvider, private alertUtil: AlertUtil ) {
      activatedRoute.params.subscribe(params => {
         this.appName = params.appname;
         if (this.appName == 'Bodh') {
            this.title = 'Learner Dashboard'
         } else {
            if (this.appName == 'Samiksha') {
               this.showSkeleton = true;
               if (navigator.onLine) {
                  this.getRoles();
               } else {
                  this.alertUtil.errorMessageToast('Check your internet connection.');
               }
            }
            this.title = this.appName + ' ' + 'Dashboard';
         }
      })
   }

   ngOnInit() {

   }
   // navigate to content
   public navigateToContent(type) {
      if (navigator.onLine) {
         this.router.navigate(['/top-contents', type]);
      } else {
         this.alertUtil.errorMessageToast('Check your internet connection.');
      }
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
                     if (data.result.length > 0) {
                        this.roles = data.result;
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


}
