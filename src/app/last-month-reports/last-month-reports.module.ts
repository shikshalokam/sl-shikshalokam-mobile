import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LastMonthReportsPage } from './last-month-reports.page';
import { TranslateModule } from '@ngx-translate/core';

import {SharedModule} from '../shared.module';
const routes: Routes = [
  {
    path: '',
    component: LastMonthReportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [LastMonthReportsPage]
})
export class LastMonthReportsPageModule {}
