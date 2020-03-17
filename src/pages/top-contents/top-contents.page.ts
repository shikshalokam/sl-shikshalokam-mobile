import { Component, OnInit } from '@angular/core';
import { TopContentService } from './top-contents.service';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../services/api/api';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ProgramsService } from '../programs/programs.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'app-top-contents',
  templateUrl: './top-contents.page.html',
  styleUrls: ['./top-contents.page.scss'],
})

export class TopContentsPage implements OnInit {
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
  constructor(private topContentService: TopContentService, private storage: Storage, private api: ApiProvider,private screenOrientation: ScreenOrientation,
    private programsService: ProgramsService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.type = params.type;
      if (params.type == APP_SAMIKSHA) {
        this.parameters = params;
        this.getReports();
      }
    })

  }

  ionViewDidEnter() {
    this.showChart = false;
    this.showNoMsgCard = false;
    this.getCurrentMonth();
    this.getTopViewedContents();
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
    }
  }
  ngOnInit() {

  }
  // get current month
  public getCurrentMonth() {
    let date = new Date();
    this.currentMonth = AppConstants.MONTH_NAMES[date.getMonth() - 1];
  }

  // get top viewed content
  public getUsageByContent() {
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
            this.topContentService.getUsageByContent(userTokens.access_token).subscribe((data: any) => {
              this.showSkeleton = false;
              if (data.result && data.data.length > 0) {
                this.usageContents = data.data;
                this.setupChart();
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

  // get top viewed content
  public getTopViewedContents() {
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
            this.topContentService.getTopViewedContent(userTokens.access_token).subscribe((data: any) => {
              if (data.result && data.data.length > 0) {
                this.contents = data.data;
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

  // get downloaded content
  public getDownloadedContent() {
    this.storage.get(AppConstants.STORAGE_USER_TOKENS).then(data => {
      this.api.refreshToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set(AppConstants.STORAGE_USER_TOKENS, userTokens).then(usertoken => {
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

  // get enrolled courses
  public getEnrolledCourses() {
    this.storage.get(AppConstants.STORAGE_USER_TOKENS).then(data => {
      this.api.refreshToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set(AppConstants.STORAGE_USER_TOKENS, userTokens).then(usertoken => {
            let userDetails: any = jwt_decode(usertoken.access_token);
            this.showSkeleton = true;
            this.topContentService.getEnrolledCourses(userTokens.access_token, userDetails.sub).subscribe((data: any) => {
              if (data.result && data.data.length > 0) {
                this.courses = data.data;
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

  //  Set chart data
  public setupChart() {
    let data: any = [];
    let series: any = [];
    for (let i = 0; i < this.usageContents.length; i++) {
      data.push(this.usageContents[i].content_name);
      series.push(this.usageContents[i].total_users_viewed);
    }
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Usage content'
      },
      xAxis: {
        categories: data
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Content viewed'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        data: series
      }]
    };
  }

  //  get reports
  public getReports() {
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
            this.programsService.getReports(userTokens.access_token, this.parameters).subscribe((data: any) => {
              this.showSkeleton = false;
              if (data.reportSections) {
                this.reports = data;
                this.prepareCharts();
                this.showNoMsgCard = false;
              }
            }, error => {
              this.showSkeleton = false;
            });
          }, error => {
            this.showSkeleton = false;
          });
        }
      });
    });
  }

  // prepare charts
  public prepareCharts() {
    this.chartObj = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.reports.reportSections[0].chart.type
      },
      title: {
        text: this.reports.reportSections[0].chart.title
      },
      xAxis: this.reports.reportSections[0].chart.xAxis,
      yAxis: this.reports.reportSections[0].chart.yAxis,
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: this.reports.reportSections[0].chart.data

    }
    this.datas = this.reports.reportSections[1];
  }
}
