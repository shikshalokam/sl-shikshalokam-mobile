import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HighchartsChartModule } from 'highcharts-angular';
import { IonicModule } from '@ionic/angular';

import { AssessmentChartPage } from './assessment-chart.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentChartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,HighchartsChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssessmentChartPage],
  providers:[ScreenOrientation]
})
export class AssessmentChartPageModule {}
