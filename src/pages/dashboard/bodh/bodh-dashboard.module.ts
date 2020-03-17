import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BodhDashboardPage } from './bodh-dashboard.page';
import {TranslateModule} from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: BodhDashboardPage, children: [
      { path: 'my-downloads', loadChildren: '../../my/downloads/my-downloads.module#MyDownloadsPageModule' },
      { path: 'my-courses', loadChildren: '../../my/courses/my-courses.module#MyCoursesPageModule' },
      { path: 'top-contents', loadChildren: '../../top-contents/top-contents.module#TopContentsPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [BodhDashboardPage]
})
export class BodhDashboardPageModule {}
