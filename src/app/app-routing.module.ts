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
  { path: 'app-content/:appname', loadChildren: './app-content/app-content.module#AppContentPageModule' },
  { path: 'top-contents/:type', loadChildren: './top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'top-contents/:prgrmId/:slnId/:type', loadChildren: './top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'entities/:id/:type/:group', loadChildren: './entities/entities.module#EntitiesPageModule' },
  { path: 'programs/:entityId/:entityType/:subType', loadChildren: './programs/programs.module#ProgramsPageModule' },
  { path: 'bodh-dashboard', loadChildren: './bodh-dashboard/bodh-dashboard.module#BodhDashboardPageModule' },
  { path: 'samiksha-dashboard', loadChildren: './samiksha-dashboard/samiksha-dashboard.module#SamikshaDashboardPageModule' },
  { path: 'unnati-dashboard', loadChildren: './unnati-dashboard/unnati-dashboard.module#UnnatiDashboardPageModule' },
  { path: 'last-month-reports', loadChildren: './last-month-reports/last-month-reports.module#LastMonthReportsPageModule' },
  { path: 'last-quarter-reports', loadChildren: './last-quarter-reports/last-quarter-reports.module#LastQuarterReportsPageModule' },
  { path: 'my-downloads', loadChildren: './my-downloads/my-downloads.module#MyDownloadsPageModule' },
  { path: 'my-courses', loadChildren: './my-courses/my-courses.module#MyCoursesPageModule' },
  { path: 'roles', loadChildren: './roles/roles.module#RolesPageModule' },
   { path: 'fullreports/:state', loadChildren: './fullreports/fullreports.module#FullreportsPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
