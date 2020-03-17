import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtil } from '../../../utils/alert.util';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
    },
    {
      title: 'Create and Track Projects',
      appName: 'Unnati',
      icon: '/assets/images/unnati-small@3x.png',
      id: 'org.shikshalokam.unnati'
    }
  ]
  constructor(private activeRouter: ActivatedRoute, private router: Router,
    private screenOrientation: ScreenOrientation, private alertUtil: AlertUtil ) {
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    } catch (error) {
    }
  }
  // Navigating to content screen with appname
  // Based on appname, we monitoring different types of data.
  public navigateToContent(appname) {
    if (navigator.onLine) {
      if (appname == 'Bodh') {
        this.router.navigate(['/bodh-dashboard/top-contents']);
      } else if (appname == 'Samiksha') {
        this.router.navigate(['/roles']);
      } else if (appname == 'Unnati') {
        this.router.navigate(['/unnati-dashboard/last-month-reports']);
      }
    } else {
      this.alertUtil.errorMessageToast('Check your internet connection.');
    }
  }
}
