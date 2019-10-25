import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.page.html',
  styleUrls: ['./dashboard-chart.page.scss'],
})
export class DashboardChartPage implements OnInit {
private applications = [
    {
      title: 'Experience Personalized Learning',
      appName: 'Bodh',
      icon: '/assets/images/bodh-d.png',
      id: 'org.shikshalokam.bodh'
    },
    {
      title: 'Identify Areas of Improvement',
      appName: 'Samiksha',
      icon: '/assets/images/samiksha-d.png',
      id: 'org.shikshalokam.samiksha',
    }
  ]
  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    // this.router.params.subscribe(params => {
    //   console.log(params.id, "Params");
    //   this.id = params.id;
    // })
  }

  ngOnInit() {
  }
  // Navigating to content screen with appname 
  // Based on appname, we monitoring different types of data.  
  public navigateToContent(appname) {
    this.router.navigate(['/app-content', appname]);
  }
}
