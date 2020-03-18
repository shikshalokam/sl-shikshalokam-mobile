import { Component, OnInit } from '@angular/core';
import { UnnatiDashboardService } from '../../dashboard/unnati/unnati-dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ApiProvider } from '../../../services/api/api';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppConstants } from '../../../app/app.constants';
import { AlertUtil } from '../../../utils/alert.util';

@Component({
  selector: 'app-last-month-reports',
  templateUrl: './last-month-reports.page.html',
  styleUrls: ['./last-month-reports.page.scss'],
})

export class LastMonthReportsPage implements OnInit {
  private currentMonth;
  private showChart: boolean = false;
  private report;
  private chartOptions;
  private showSkeleton: boolean = true;
  respStatus;
  private skeletons = [{}, {}, {}, {}, {}];
  highcharts = Highcharts;

  constructor(private unnatiDashboardService: UnnatiDashboardService,
    private router: Router, public alertUtil: AlertUtil,
    public toastController: ToastController, private api: ApiProvider,
    private storage: Storage) {
  }

  ngOnInit() {
    if (navigator.onLine) {
      this.getData();
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
            this.unnatiDashboardService.getReports(userTokens.access_token, 'lastMonth').subscribe((data: any) => {
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
        this.showSkeleton = false;
      });
    });
  }

  public setupChart() {
    let completed: any;
    if (this.report.completed > 0 || this.report.pending > 0) {
      completed = ( this.report.completed / ( this.report.completed + this.report.pending ) ) * 100;
      completed = completed.toFixed(0);
    } else {
      this.report.completed = 0;
      this.report.pending = 0;
      completed = 0;
    }
    this.chartOptions = {
      chart: {
        type: 'pie'
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

  public viewFullReport(value) {
    if (navigator.onLine) {
      this.router.navigate(['/fullreports', value]);
    } else {
      this.alertUtil.errorMessageToast('Please check your internet connection.');
    }
  }
}
