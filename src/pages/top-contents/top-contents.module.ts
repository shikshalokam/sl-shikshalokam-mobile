import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TopContentsPage } from './top-contents.page';
import { SharedModule } from '../../app/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

const routes: Routes = [
  {
    path: '',
    component: TopContentsPage
  }
];

@NgModule({
  imports: [
    CommonModule, SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [TopContentsPage],
  providers: [ScreenOrientation]
})
export class TopContentsPageModule { }
