import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ApiProvider } from '../../../services/api/api';
import { Storage } from '@ionic/storage';
import { UnnatiDashboardService } from '../../dashboard/unnati/unnati-dashboard.service';
import { ToastController } from '@ionic/angular';
import { AppConstants } from '../../../app/app.constants';
import { AlertUtil } from '../../../utils/alert.util';

@Component({
  selector: 'app-last-quarter-reports',
  templateUrl: './last-quarter-reports.page.html',
  styleUrls: ['./last-quarter-reports.page.scss'],
})
export class LastQuarterReportsPage implements OnInit {
  private currentMonth;
  private chartOptions;
  private showChart: boolean = false;
  private report;
  private showSkeleton: boolean = true;
  private skeletons = [{}, {}, {}, {}, {}]
  highcharts = Highcharts;
  respStatus;
  constructor(private unnatiDashboardService: UnnatiDashboardService,
    private router: Router, private toastController: ToastController,
    private api: ApiProvider, private storage: Storage,
    private alertUtil: AlertUtil) {
  }

  ngOnInit() {
    if (navigator.onLine) {
      this.getData();
    } else {
      this.alertUtil.errorMessageToast('Please check your internet connection.');
    }
  }

  public viewFullReport(value) {
    if (navigator.onLine) {
      this.router.navigate(['/fullreports', value]);
    } else {
      this.alertUtil.errorMessageToast('Please check your internet connection.');
    }
  }

  public getData() {
    this.storage.get(AppConstants.STORAGE_USER_TOKENS).then(data => {
      this.api.refreshToken(data.refresh_token).subscribe((data: any) => {
        this.showSkeleton = true;
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set(AppConstants.STORAGE_USER_TOKENS, userTokens).then(usertoken => {
            this.unnatiDashboardService.getReports(userTokens.access_token, 'lastQuarter').subscribe((data: any) => {
              this.report = data.data;
              this.respStatus = data.status;
              if (this.report && data.status != 'failed') {
                this.setupChart();
              }
              this.showSkeleton = false;
            }, error => {
              this.showSkeleton = false;
            });
          }, error => {
            this.showSkeleton = false;
          });
        }
      }, error => {
        this.showSkeleton = true;
      });
    });
  }

  public setupChart() {
    let totalTask;
    let completed: any;
    if (this.report.completed > 0 || this.report.pending > 0) {
      totalTask = this.report.completed + this.report.pending;
      completed = (this.report.completed / totalTask) * 100;
      completed = completed.toFixed(0);
    } else {
      this.report.completed = 0;
      this.report.pending = 0;
      completed = 0;
    }
    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: '<b>' + completed + ' % <br>Completed</b>'
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      }, credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          colors: [
            '#20ba8d',
            '#adafad'
          ],
        }
      },
      series: [{
        name: "Tasks",
        data: [["Completed", this.report.completed], ["Pending", this.report.pending]],
        size: '90%',
        innerSize: '70%',
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }]
    };
  }
}
