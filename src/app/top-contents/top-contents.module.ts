import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TopContentsPage } from './top-contents.page';
import { HighchartsChartComponent } from 'highcharts-angular';

const routes: Routes = [
  {
    path: '',
    component: TopContentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TopContentsPage,HighchartsChartComponent]
})
export class TopContentsPageModule {}
