import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-learning-chart',
  templateUrl: './learning-chart.page.html',
  styleUrls: ['./learning-chart.page.scss'],
})
export class LearningChartPage implements OnInit {

  constructor() { }

  ngOnInit() {
// Create the chart

Highcharts.chart('container', {
  chart: {
      type: 'bar'
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['Resources', 'Courses'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Courses',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: ' '
  },
  series: [{
    type:'bar',
      name: '',
      data: [32, 10]
  }],
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

}
