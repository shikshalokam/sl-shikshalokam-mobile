import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-vote-report',
  templateUrl: './vote-report.page.html',
  styleUrls: ['./vote-report.page.scss'],
})
export class VoteReportPage implements OnInit {

  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
    // Create the chart
Highcharts.chart('container', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Poll Results'
  },
  xAxis: {
      type: 'category',
    //   labels: {
    //     rotation: -45,
    //     style: {
    //         fontSize: '12px',
    //         fontFamily: 'Verdana, sans-serif'
    //     }
    // }
  },
  yAxis: {
      title: {
          text: ''
      }

  },
  legend: {
      enabled: false
  },
  plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
          }
      }
  },
  series: [
      {
        type: 'column',
          name: "",
          colorByPoint: true,
          data: [
              {
                  name: "Well-stocked library",
                  y: 3,
              },
              {
                  name: "Working Computer Lab",
                  y: 5,
              },
              {
                  name: "More teachers",
                  y: 1,
              },
              {
                  name: "More parents should come for PTMs",
                  y: 6,
              },
              {
                name: "Regular art sessions in the school",
                y: 1,
            },
            {
                name: "Training on English",
                y: 6,
            },
            {
                name: "Training on how to use computer",
                y: 6,
            }
          ]
      }
  ],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 300
      },
      chartOptions: {
        legend: {
          enabled: false
        }
      }
    }]
  }
});
  }

  ngOnDestroy()
  {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
    }
  }

}