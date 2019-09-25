import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.page.html',
  styleUrls: ['./dashboard-chart.page.scss'],
})
export class DashboardChartPage implements OnInit {
  private id;
  constructor(private router: ActivatedRoute) {
    // this.router.params.subscribe(params => {
    //   console.log(params.id, "Params");
    //   this.id = params.id;
    // })
  }

  ngOnInit() {

    
    }
}
