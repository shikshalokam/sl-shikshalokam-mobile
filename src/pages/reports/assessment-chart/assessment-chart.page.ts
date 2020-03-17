import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-assessment-chart',
  templateUrl: './assessment-chart.page.html',
  styleUrls: ['./assessment-chart.page.scss'],
})
export class AssessmentChartPage implements OnInit {
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
      //FIXME:: why????
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
  }

}
