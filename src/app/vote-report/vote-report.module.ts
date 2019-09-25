import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicModule } from '@ionic/angular';

import { VoteReportPage } from './vote-report.page';

const routes: Routes = [
  {
    path: '',
    component: VoteReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VoteReportPage],
  providers:[ScreenOrientation]
})
export class VoteReportPageModule {}
