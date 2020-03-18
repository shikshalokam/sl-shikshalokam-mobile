import { Component, OnInit } from '@angular/core';
//FIXME:: this service below can be moved to service layer instead?
import { TopContentService } from '../../top-contents/top-contents.service'
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../services/api/api';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts-gantt';
//FIXME:: this service below can be moved to service layer instead?
import { ProgramsService } from '../../programs/programs.service';
import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'app-samiksha-dashboard',
  templateUrl: './samiksha-dashboard.page.html',
  styleUrls: ['./samiksha-dashboard.page.scss'],
})

export class SamikshaDashboardPage implements OnInit {
  private type;
  private showSkeleton: boolean = true;
  private reports;
  private parameters;
  chartOptions;
  chartObj;
  chartObj1;
  private skeletons = [{}, {}, {}, {}, {}, {}, {}];
  private datas;
  highcharts = Highcharts;

  constructor(private topContentService: TopContentService,

    private storage: Storage,
    private api: ApiProvider,
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getReports();
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
              }
              this.showSkeleton = false;
            }, error => {
              this.showSkeleton = false;
            })
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
