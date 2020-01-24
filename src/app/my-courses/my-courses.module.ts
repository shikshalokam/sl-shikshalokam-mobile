import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicModule } from '@ionic/angular';
import { MyCoursesPage } from './my-courses.page';
import { SharedModule } from '../shared.module';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: MyCoursesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, SharedModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [MyCoursesPage],
  providers: [ScreenOrientation]
})
export class MyCoursesPageModule { }
