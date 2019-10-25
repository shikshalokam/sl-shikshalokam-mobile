import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';
import {ActivatedRoute, Router} from '@angular/router';
import { ProgramsService } from './programs.service';
@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  private parameters;
  private showNoMsgCard: boolean = false;
  private programs;
  private showSkeleton:boolean = false;
  private reports;
  constructor( private storage : Storage, private api : ApiProvider, private router : Router, private activateRouter :ActivatedRoute, private programsService:ProgramsService) {
    activateRouter.params.subscribe(params =>{
      this.parameters = params;
      localStorage.setItem('entityId',this.parameters.entityId);
      localStorage.setItem('entityType',this.parameters.entityType);
      localStorage.setItem('subType',this.parameters.subType);
      this.getPrograms();
    })
   }

  ngOnInit() {
  }
  //  Get programs  based on entity type
  public getPrograms()
  {
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
            this.programsService.getPrograms(userTokens.access_token,this.parameters).subscribe((data: any) => {
              this.showSkeleton = false;
              this.programs = data;
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

  //  get reports
  public getReports(programId,solutionId) {
    this.router.navigate(['/top-contents',programId,solutionId,'samiksha'])
    // this.storage.get('userTokens').then(data => {
    //   this.api.refershToken(data.refresh_token).subscribe((data: any) => {
    //     let parsedData = JSON.parse(data._body);
    //     if (parsedData && parsedData.access_token) {
    //       let userTokens = {
    //         access_token: parsedData.access_token,
    //         refresh_token: parsedData.refresh_token,
    //       };
    //       this.storage.set('userTokens', userTokens).then(usertoken => {
    //         this.showSkeleton = true;
    //         this.programsService.getReports(userTokens.access_token,programId,solutionId,this.parameters).subscribe((data: any) => {
    //           this.showSkeleton = false;
    //           console.log(data, "data");
    //           if (data.reportSections) {
    //             this.reports = data;
    //             this.showNoMsgCard = false;
    //           } else {
    //             //  this.showNoMsgCard = true;
    //           }
    //           this.showSkeleton = false;
    //         }, error => {
    //           this.showSkeleton = false;
    //         })
    //       }, error => {
    //         this.showSkeleton = false;
    //       })
    //     }
    //   })
    // })
  }

  public getEntities() {
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
            this.programsService.getEntities(userTokens.access_token,this.parameters).subscribe((data: any) => {
              this.showSkeleton = false;
              if (data.result) {
                this.programs = data.result;
                this.showNoMsgCard = false;
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
}
