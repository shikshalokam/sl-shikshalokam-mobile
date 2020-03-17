import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SamikshaDashboardPage } from './samiksha-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: SamikshaDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SamikshaDashboardPage]
})
export class SamikshaDashboardPageModule {}
