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
  { path: 'assesment-chart', loadChildren: './assesment-chart/assesment-chart.module#AssesmentChartPageModule' },
  { path: 'learning-chart', loadChildren: './learning-chart/learning-chart.module#LearningChartPageModule' },
  { path: 'domain1', loadChildren: './domain1/domain1.module#Domain1PageModule' },
  { path: 'domain2', loadChildren: './domain2/domain2.module#Domain2PageModule' },
  { path: 'domain4', loadChildren: './domain4/domain4.module#Domain4PageModule' },
  { path: 'domain3', loadChildren: './domain3/domain3.module#Domain3PageModule' },
  { path: 'voting', loadChildren: './voting/voting.module#VotingPageModule' },
  { path: 'vote-report', loadChildren: './vote-report/vote-report.module#VoteReportPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
