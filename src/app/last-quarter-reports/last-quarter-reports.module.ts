import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LastQuarterReportsPage } from './last-quarter-reports.page';
import { SharedModule} from '../shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: LastQuarterReportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,SharedModule,TranslateModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LastQuarterReportsPage]
})
export class LastQuarterReportsPageModule {}
