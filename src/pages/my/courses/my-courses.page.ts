import { Component, OnInit } from '@angular/core';
import { TopContentService } from '../../top-contents/top-contents.service'
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../services/api/api';
import * as jwt_decode from "jwt-decode";
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppConstants } from '../../../app/app.constants';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})

export class MyCoursesPage implements OnInit {
  showNoMsgCard: boolean = false;
  lastMonth;
  showSkeleton: boolean = true;
  courses;
  reports;
  parameters;
  chartOptions;
  chartObj;
  chartObj1;
  skeletons = [{}, {}, {}, {}, {}, {}, {}];
  highcharts = Highcharts;
  constructor(
    private topContentService: TopContentService,
    private storage: Storage,
    private api: ApiProvider,
    private screenOrientation: ScreenOrientation) {
  }

  ngOnInit() {
    this.getEnrolledCourses();
    this.getLastMonth();
  }

  ionViewDidEnter() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
  }

  // get enrolled courses
  public getEnrolledCourses() {
    this.showSkeleton = true;
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
              this.showSkeleton = false;
              if (data.result && data.data.length > 0) {
                let data1 = []
                data.data.forEach(course => {
                  let courses = [];
                  courses.push(course.course_name, 800);
                  data1.push(courses);
                });
                this.courses = data1;
                this.setupChart(this.courses);
                this.showNoMsgCard = false;
              } else {
                this.showNoMsgCard = true;
              }
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
    }, error => {
      this.showSkeleton = false;
    });
  }

  // chart setup
  public setupChart(courses) {
    Highcharts.chart('container', {
      chart: {
        type: 'bar',
        scrollablePlotArea: {
          minHeight: 1000
        },
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        title: {
          text: ''
        }
      },
      yAxis: {
        lineWidth: 1,
        title: {
          text: '',
          align: 'high'
        },
        showLastLabel: false
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          },
          color: '#fa634d'
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'bar',
        data: courses
      }]
    });
  }

  // get last month
  public getLastMonth() {
    let date = new Date();
    this.lastMonth = AppConstants.MONTH_NAMES[date.getMonth() - 1];
  }
}
