import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnnatiDashboardService } from '../unnati-dashboard/unnati-dashboard.service';
import { ApiProvider } from '../api/api';
import { Storage } from '@ionic/storage';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-fullreports',
  templateUrl: './fullreports.page.html',
  styleUrls: ['./fullreports.page.scss'],
})
export class FullreportsPage implements OnInit {
  public state;
  public timeInterval
  public reports
  public idvalue = 'container';
  highcharts = Highcharts;
  public showCharts: boolean = false;
  public chartOptions;
  private showSkeleton: boolean = false;
  private skeleton = [{}]
  constructor(private activatedRoute: ActivatedRoute, private screenOrientation: ScreenOrientation, private router: Router, private myReportsService: UnnatiDashboardService, private api: ApiProvider, private storage: Storage) {
    activatedRoute.params.subscribe((params: any) => {
      console.log(params.state, "params.state");
      this.state = params.state;
      this.getReports(params.state);
      try {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
      }
    })
  }

  ngOnInit() {
  }
  public getReports(state) {
    this.storage.get('userTokens').then(data => {
      this.api.refershToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.showSkeleton = true;
          this.storage.set('userTokens', userTokens).then(usertoken => {
            this.myReportsService.getFullReports(userTokens.access_token, state).subscribe((data: any) => {
              data.data.forEach(report => {
                console.log(report, "report");

              });
              this.reports = data.data;
              if (this.reports.length > 0) {

                setTimeout(() => {
                  this.showCharts = true;
                  this.setUpChart(this.reports[0]);
                }, 1000);
              } else {
                this.showSkeleton = false;
              }

              // this.chartOptions = {
              //   // title: this.reports[0].title,
              //   // series:  this.reports[0].series[0],
              //   // xAxis:  this.reports[0].xAxis
              //   chart:{
              //     type:'gantt'
              //   },
              //   title: {
              //     text: 'Gantt Chart with Progress Indicators'
              // },
              // xAxis: {
              //     min: Date.UTC(2014, 10, 17),
              //     max: Date.UTC(2014, 10, 30)
              // },

              // series: [{
              //     name: 'Project 1',
              //     type:'gantt',
              //     data: [{
              //         name: 'Start prototype',
              //         start: Date.UTC(2014, 10, 18),
              //         end: Date.UTC(2014, 10, 25),
              //         completed: 0.25
              //     }, {
              //         name: 'Test prototype',
              //         start: Date.UTC(2014, 10, 27),
              //         end: Date.UTC(2014, 10, 29)
              //     }, {
              //         name: 'Develop',
              //         start: Date.UTC(2014, 10, 20),
              //         end: Date.UTC(2014, 10, 25),
              //         completed: {
              //             amount: 0.12,
              //             fill: '#fa0'
              //         }
              //     }, {
              //         name: 'Run acceptance tests',
              //         start: Date.UTC(2014, 10, 23),
              //         end: Date.UTC(2014, 10, 26)
              //     }]
              // }]
              // }
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
  public setUpChart(data) {
    this.showSkeleton = false;
    // console.log(data, "data");
    // Highcharts.ganttChart('container', {
    //   title: {
    //     text: data.title.text
    //   },
    //   xAxis: {
    //     min: data.xAxis.min,
    //     max: data.xAxis.max
    //   },

    //   series: [{
    //     type: 'gantt',
    //     data: data.series[0].data
    //   }]
    // });
    for (let i = 0; i <= this.reports.length; i++) {
      let minDate = new Date(this.reports[i].xAxis.min);
      let maxDate = new Date(this.reports[i].xAxis.max);
      let sdate = minDate.getDate();
      let smonth = minDate.getMonth();
      let syear = minDate.getFullYear();
      let edate = maxDate.getDate();
      let emonth = maxDate.getMonth();
      let eyear = maxDate.getFullYear();
      Highcharts.ganttChart('container' + i, {
        // chart: {
        //   scrollablePlotArea: {
        //     minWidth: 300,
        //     scrollPositionX: 1
        //   }
        // },
        title: {
          text: ''
        },
        xAxis: {
          min: Date.UTC(syear, smonth, sdate),
          max: Date.UTC(eyear, emonth, edate)
        },
        legend: {
          enabled: false
        }, credits: {
          enabled: false
        },
        series: [{
          type: 'gantt',
          data: this.reports[i].series[0].data
        }]
      });
    }
  }
  // go back
  public goBack() {
    this.router.navigate(['/project-view/my-reports/last-' + this.state + '-reports']);
  }

  ngOnDestroy() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
    }
  }
}
