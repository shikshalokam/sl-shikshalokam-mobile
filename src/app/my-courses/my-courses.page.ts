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
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})
export class MyCoursesPage implements OnInit {
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  private showNoMsgCard;
  private type;
  private showChart: boolean = false;
  private lastMonth;
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
  private preparedJson = [
    ["Gantt chart", 1000],
    ["Autocalculation and plotting of trend lines", 575],
    ["Allow navigator to have multiple data series", 523],
    ["Implement dynamic font size", 427],
    ["Multiple axis alignment control", 399],
    ["Stacked area (spline etc) in irregular datetime series", 309],
    ["Adapt chart height to legend height", 278],
    ["Export charts in excel sheet", 239],
    ["Toggle legend box", 235],
    ["Venn Diagram", 203],
    ["Add ability to change Rangeselector position", 182],
    ["Draggable legend box", 157],
    ["Sankey Diagram", 149],
    ["Add Navigation bar for Y-Axis in Highstock", 144],
    ["Grouped x-axis", 143],
    ["ReactJS plugin", 137],
    ["3D surface charts", 134],
    ["Draw lines over a stock chart, for analysis purpose", 118],
    ["Data module for database tables", 118],
    ["Draggable points", 117]
  ];
  constructor(private topContentService: TopContentService, private storage: Storage, private api: ApiProvider, private screenOrientation: ScreenOrientation,
    private programsService: ProgramsService, private activatedRoute: ActivatedRoute) { }


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
            this.topContentService.getEnrolledCourses(userTokens.access_token, userDetails.sub).subscribe((data: any) => {
              this.setupChart(this.preparedJson);
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
  public setupChart(preparedJson) {
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
          text: null
        }
      },
      yAxis: {
        lineWidth: 1,
        title: {
          text: 'Votes',
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
        name: 'Votes',
        type: 'bar',
        data: preparedJson
      }]
    });
  }

  // get last month
  public getLastMonth() {
    let date = new Date();
    this.lastMonth = this.monthNames[date.getMonth() - 1];
  }
}