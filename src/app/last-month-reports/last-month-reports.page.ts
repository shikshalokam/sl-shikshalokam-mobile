import { Component, OnInit } from '@angular/core';
import { UnnatiDashboardService } from '../unnati-dashboard/unnati-dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ApiProvider } from '../api/api';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  private showSkeleton: boolean = false;
  private skeletons = [{}, {}, {}, {}, {}];
  highcharts = Highcharts;
  constructor(private unnatiDashboardService: UnnatiDashboardService, private router: Router, public toastController: ToastController, private api: ApiProvider, private storage: Storage) { }

  ngOnInit() {
    if (navigator.onLine) {
      this.getData();
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
            this.unnatiDashboardService.getReports(userTokens.access_token, 'lastMonth').subscribe((data: any) => {
              this.report = data.data;
              console.log(this.report, this.report.length, "this.report");
              if (this.report && data.status != 'failed') {
                this.setupChart();
              }
              this.showSkeleton = false;
            })
          }, error => {
            this.showSkeleton = false;
            console.log(error, 'dddd');
          })
        }
      }, error => {
        this.showSkeleton = false;
      })
    })
  }
  public setupChart() {
    let totalTask = this.report.completed + this.report.pending;
    let completed: any = (this.report.completed / totalTask) * 100;
    completed = completed.toFixed(0);
    this.chartOptions = {
      chart: {
        type: 'pie'
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
    console.log(value);
    if (navigator.onLine) {
      this.router.navigate(['/fullreports', value]);
    } else {
      this.errorToast('Please check your internet connection.');
    }
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
