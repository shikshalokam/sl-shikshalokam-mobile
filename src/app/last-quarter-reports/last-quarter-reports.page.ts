import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ApiProvider } from '../api/api';
import { Storage } from '@ionic/storage';
import { UnnatiDashboardService } from '../unnati-dashboard/unnati-dashboard.service';
import { ToastController } from '@ionic/angular';
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
  constructor(private unnatiDashboardService: UnnatiDashboardService, private router: Router, private toastController: ToastController, private api: ApiProvider, private storage: Storage) { }

  ngOnInit() {
    if (navigator.onLine) {
      this.getData();
    } else {
      this.errorToast('Please check your internet connection.');
    }
  }
  public viewFullReport(value) {
    if (navigator.onLine) {
      this.router.navigate(['/fullreports', value]);
    } else {
      this.errorToast('Please check your internet connection.');
    }
  }

  public getData() {
    this.storage.get('userTokens').then(data => {
      this.api.refershToken(data.refresh_token).subscribe((data: any) => {
        this.showSkeleton = true;
        let parsedData = JSON.parse(data._body);
        if (parsedData && parsedData.access_token) {
          let userTokens = {
            access_token: parsedData.access_token,
            refresh_token: parsedData.refresh_token,
          };
          this.storage.set('userTokens', userTokens).then(usertoken => {
            this.unnatiDashboardService.getReports(userTokens.access_token, 'lastQuarter').subscribe((data: any) => {
              this.report = data.data;
              this.respStatus = data.status;
              if (this.report && data.status != 'failed') {
                this.setupChart();
              }
              this.showSkeleton = false;
            }, error => {
              this.showSkeleton = false;
            })
          }, error => {
            this.showSkeleton = false;
          })
        }
      }, error => {
        this.showSkeleton = true;
      })
    })
  }
  public setupChart() {
    let totalTask =   this.report.completed +  this.report.pending;
    let completed:any = (this.report.completed / totalTask) * 100;
    completed = completed.toFixed(0);
    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: '<b>' + completed + ' % <br>Completed</b>'
      },
      // xAxis: {
      //   categories: data
      // },
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
        data: [["Completed", this.report.completed],["Pending", this.report.pending]],
        size: '90%',
        innerSize: '70%',
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }]
    };
  }
  // Display error Message
  async errorToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
