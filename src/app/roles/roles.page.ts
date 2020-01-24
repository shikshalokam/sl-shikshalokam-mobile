import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ProgramsService } from '../programs/programs.service';
import { AppContentService } from '../app-content/app-content.service';
import { ToastController } from '@ionic/angular';

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
    private programsService: ProgramsService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private appContentService: AppContentService) { }

  ngOnInit() {
    this.getRoles()
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
              console.log(data.result, "data.result");
              if (data.result.length) {
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
    if (navigator.onLine) {
      if (group[0]) {
        this.router.navigate(['/entities', id, type, group[0]]);
      } else {
        group[0] = '';
        this.router.navigate(['/programs', id, type, group[0]]);
      }
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
}
