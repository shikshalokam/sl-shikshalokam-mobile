import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnnatiDashboardService } from '../../dashboard/unnati/unnati-dashboard.service';
import { ApiProvider } from '../../../services/api/api';
import { Storage } from '@ionic/storage';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppConstants } from '../../../app/app.constants.ts';

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
  private showSkeleton: boolean = true;
  private skeletons = [{}, {}, {}, {}, {}]

  constructor(private activatedRoute: ActivatedRoute, private screenOrientation: ScreenOrientation, private router: Router, private myReportsService: UnnatiDashboardService, private api: ApiProvider, private storage: Storage) {
    activatedRoute.params.subscribe((params: any) => {
      this.state = params.state;
      this.getReports(params.state);
      try {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
      }
    });
  }

  ngOnInit() {
  }

  public getReports(state) {
    this.storage.get(AppConstants.STORAGE_USER_TOKENS).then(data => {
      this.api.refreshToken(data.refresh_token).subscribe((data: any) => {
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set(AppConstants.STORAGE_USER_TOKENS, userTokens).then(usertoken => {
            this.myReportsService.getFullReports(userTokens.access_token, state).subscribe((data: any) => {
              this.reports = data.data;
              if (this.reports.length > 0) {
                setTimeout(() => {
                  this.setUpChart(this.reports[0]);
                }, 900);
              } else {
                this.showSkeleton = false;
              }
            }, error => {
              this.showSkeleton = false;
            })
          }, error => {
            this.showSkeleton = false;
          })
        }
      }, error => {
        this.showSkeleton = false;
      })
    }, error => {
      this.showSkeleton = false;
    })
  }

  public setUpChart(data) {
    this.showCharts = true;
    this.showSkeleton = false;
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
        title: { text: '' },
        xAxis: { min: Date.UTC(syear, smonth, sdate), max: Date.UTC(eyear, emonth, edate) },
        legend: { enabled: false }, credits: { enabled: false },
        series: [ { type: 'gantt', data: this.reports[i].series[0].data } ]
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
