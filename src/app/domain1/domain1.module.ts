import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicModule } from '@ionic/angular';

import { Domain1Page } from './domain1.page';

const routes: Routes = [
  {
    path: '',
    component: Domain1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Domain1Page],
  providers:[ScreenOrientation]
})
export class Domain1PageModule {}
