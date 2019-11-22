import { Component, OnInit } from '@angular/core';
import { TopContentService } from '../top-contents/top-contents.service'
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ProgramsService } from '../programs/programs.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-my-downloads',
  templateUrl: './my-downloads.page.html',
  styleUrls: ['./my-downloads.page.scss'],
})
export class MyDownloadsPage implements OnInit {
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  private showNoMsgCard;
  private type;
  private showChart: boolean = false;
  private currentMonth;
  private showSkeleton: boolean = true;
  private contents;
  private downloads;
  private courses;
  private usageContents;
  private reports;
  private parameters;
  chartOptions;
  chartObj;
  chartObj1;
  private skeletons = [{}, {}, {}, {}, {}, {}, {}];
  private datas;
  highcharts = Highcharts;
  constructor(private topContentService: TopContentService, private storage: Storage, private api: ApiProvider, private screenOrientation: ScreenOrientation,
    private programsService: ProgramsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCurrentMonth();
    this.getDownloadedContent();
  }
  ionViewDidEnter() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
    }
  }
  // get downloaded content
  public getDownloadedContent() {
    this.storage.get('userTokens').then(data => {
      this.api.refershToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set('userTokens', userTokens).then(usertoken => {
            let userDetails: any = jwt_decode(usertoken.access_token);
            this.showSkeleton = true;
            this.topContentService.getDownloadedContent(userTokens.access_token, userDetails.sub).subscribe((data: any) => {
              if (data.result && data.data.length > 0) {
                this.downloads = data.data;
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
  // get last month
  public getCurrentMonth() {
    let date = new Date();
    this.currentMonth = this.monthNames[date.getMonth() - 1];
  }
}
