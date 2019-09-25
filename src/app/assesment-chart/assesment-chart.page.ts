import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-assesment-chart',
  templateUrl: './assesment-chart.page.html',
  styleUrls: ['./assesment-chart.page.scss'],
})
export class AssesmentChartPage implements OnInit {
  Highcharts = Highcharts;
  chartOptions;
  constructor(private screenOrientation: ScreenOrientation) { }

  ionViewDidEnter() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }
  }
  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar'
      },
      series: [{
        name: 'John',
        data: [5, 3]
    }, {
        name: 'Jane',
        data: [ 3, 2, 1]
    }, {
        name: 'Joe',
        data: [3]
    }]
    };
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
    }

    // Highcharts.chart('container', {
    //   chart: {
    //     type: 'bar'
    //   },
    //   title: {
    //     text: ''
    //   },
    //   xAxis: {
    //     categories: ['Domain1', 'Domain2', 'Domain3', 'Domain4', 'Domain5']
    //   },
    //   yAxis: {
    //     min: 0,
    //     title: {
    //       text: 'Criteria'
    //     }
    //   },
    //   legend: {
    //     reversed: true
    //   },
    //   plotOptions: {
    //     series: {
    //       stacking: 'normal'
    //     }
    //   },
    //   series: [{
    //     name: '',
    //     data: [5, 3, 4, 7, 2],
    //     type: 'bar'
    //   }, {
    //     name: '',
    //     data: [2, 2, 3, 2, 1],
    //     type: 'bar'
    //   }, {
    //     name: '',
    //     type: 'bar',
    //     data: [3, 4, 4, 2, 5],
    //   },
    //   {
    //     name: '',
    //     data: [2, 4, 4, 6],
    //     type: 'bar'
    //   }],
    // });
  }

}
