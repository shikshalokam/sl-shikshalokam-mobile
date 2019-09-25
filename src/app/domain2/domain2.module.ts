import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicModule } from '@ionic/angular';

import { Domain2Page } from './domain2.page';

const routes: Routes = [
  {
    path: '',
    component: Domain2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Domain2Page],
  providers:[ScreenOrientation]
})
export class Domain2PageModule {}
