import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicModule } from '@ionic/angular';

import { Domain4Page } from './domain4.page';

const routes: Routes = [
  {
    path: '',
    component: Domain4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Domain4Page],
  providers:[ScreenOrientation]
})
export class Domain4PageModule {}
