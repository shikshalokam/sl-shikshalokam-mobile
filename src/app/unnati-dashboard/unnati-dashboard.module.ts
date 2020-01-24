import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnnatiDashboardPage } from './unnati-dashboard.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared.module';
const routes: Routes = [
  {
    path: '',
    component: UnnatiDashboardPage,
    children: [
      { path: 'last-month-reports', loadChildren: '../last-month-reports/last-month-reports.module#LastMonthReportsPageModule' },
      { path: 'last-quarter-reports', loadChildren: '../last-quarter-reports/last-quarter-reports.module#LastQuarterReportsPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, SharedModule,
    FormsModule, TranslateModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnnatiDashboardPage]
})
export class UnnatiDashboardPageModule { }
