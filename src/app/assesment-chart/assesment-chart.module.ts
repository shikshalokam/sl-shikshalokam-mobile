import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HighchartsChartModule } from 'highcharts-angular';
import { IonicModule } from '@ionic/angular';

import { AssesmentChartPage } from './assesment-chart.page';

const routes: Routes = [
  {
    path: '',
    component: AssesmentChartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,HighchartsChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssesmentChartPage],
  providers:[ScreenOrientation]
})
export class AssesmentChartPageModule {}
