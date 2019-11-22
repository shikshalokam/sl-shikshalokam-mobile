import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HighchartsChartComponent } from 'highcharts-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    TranslateModule.forChild()
  ],
  declarations: [
    HighchartsChartComponent
  ],
  exports: [
    HighchartsChartComponent
  ]
})
export class SharedModule {}