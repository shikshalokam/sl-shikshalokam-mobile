import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { AppContentService } from './app-content.service';
@Component({
   selector: 'app-app-content',
   templateUrl: './app-content.page.html',
   styleUrls: ['./app-content.page.scss'],
})
export class AppContentPage implements OnInit {
   public appName;
   public title;
   public showSkeleton;
   private roles;
   private skeletons = [{}, {}, {}, {}, {}, {}, {}];
   constructor(private activatedRoute: ActivatedRoute, private appContentService: AppContentService, private router: Router, public toastController: ToastController, private storage: Storage, private api: ApiProvider, ) {
      activatedRoute.params.subscribe(params => {
         this.appName = params.appname;
         if (this.appName == 'Bodh') {
            this.title = 'Learner Dashboard'
         } else {
            if (this.appName == 'Samiksha') {
               this.showSkeleton = true;
               this.getRoles();
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
         this.errorMessage('Check your internet connection.');
      }
   }
   //  Show error message
   async errorMessage(msg) {
      const toast = await this.toastController.create({
         message: msg, color: 'danger',
         duration: 2000
      });
      toast.present();
   }

   // Get roles
   public getRoles() {
      this.storage.get('userTokens').then(data => {
         this.api.refershToken(data.refresh_token).subscribe((data: any) => {
            let parsedData = JSON.parse(data._body);
            if (parsedData && parsedData.access_token) {
               let userTokens = {
                  access_token: parsedData.access_token,
                  refresh_token: parsedData.refresh_token,
               };
               this.storage.set('userTokens', userTokens).then(usertoken => {
                  this.showSkeleton = true;
                  this.appContentService.getRoles(userTokens.access_token).subscribe((data: any) => {
                     this.showSkeleton = false;
                     if (data.result) {
                        this.roles = data.result;
                        //  this.showNoMsgCard = false;
                     } else {
                        //  this.showNoMsgCard = true;
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
      console.log(id, type, group, "type");
      if (group[0]) {
         console.log("in if");
         console.log(id, type, group, "type 11");
         this.router.navigate(['/entities', id, type, group[0]]);
      } else { 
         group[0] ='';
         console.log("in if else");
         console.log(id, type, group, "type 222");
         this.router.navigate(['/programs', id, type, group[0]]); }
   }
}
