import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../../app/shared.module';
import { IonicModule } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FullreportsPage } from './fullreports.page';
const routes: Routes = [
  {
    path: '',
    component: FullreportsPage
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
  declarations: [FullreportsPage],
  providers:[ScreenOrientation]
})
export class FullreportsPageModule {}
