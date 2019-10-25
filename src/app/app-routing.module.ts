import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
    },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  }
  ,
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'my-journey', loadChildren: './my-journey/my-journey.module#MyJourneyPageModule' },
 { path: 'dashboard-chart', loadChildren: './dashboard-chart/dashboard-chart.module#DashboardChartPageModule' },
  { path: 'learning-chart', loadChildren: './learning-chart/learning-chart.module#LearningChartPageModule' },
  { path: 'app-content/:appname', loadChildren: './app-content/app-content.module#AppContentPageModule' }, 
  { path: 'top-contents/:type', loadChildren: './top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'top-contents/:prgrmId/:slnId/:type', loadChildren: './top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'entities/:id/:type/:group', loadChildren: './entities/entities.module#EntitiesPageModule' },
  { path: 'programs/:entityId/:entityType/:subType', loadChildren: './programs/programs.module#ProgramsPageModule' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
