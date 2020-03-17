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
    loadChildren: '../pages/home/home.module#HomePageModule'
  }
  ,
  { path: 'about', loadChildren: '../pages/about/about.module#AboutPageModule' },
  { path: 'my-journey', loadChildren: '../pages/my/journey/my-journey.module#MyJourneyPageModule' },
  { path: 'dashboard-chart', loadChildren: '../pages/dashboard/chart/dashboard-chart.module#DashboardChartPageModule' },
  { path: 'app-content/:appname', loadChildren: '../pages/app-content/app-content.module#AppContentPageModule' },
  { path: 'top-contents/:type', loadChildren: '../pages/top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'top-contents/:prgrmId/:slnId/:type', loadChildren: '../pages/top-contents/top-contents.module#TopContentsPageModule' },
  { path: 'entities/:id/:type/:group', loadChildren: '../pages/entities/entities.module#EntitiesPageModule' },
  { path: 'programs/:entityId/:entityType/:subType', loadChildren: '../pages/programs/programs.module#ProgramsPageModule' },
  { path: 'bodh-dashboard', loadChildren: '../pages/dashboard/bodh/bodh-dashboard.module#BodhDashboardPageModule' },
  { path: 'samiksha-dashboard', loadChildren: '../pages/dashboard/samiksha/samiksha-dashboard.module#SamikshaDashboardPageModule' },
  { path: 'unnati-dashboard', loadChildren: '../pages/dashboard/unnati/unnati-dashboard.module#UnnatiDashboardPageModule' },
  { path: 'last-month-reports', loadChildren: '../pages/reports/last-month/last-month-reports.module#LastMonthReportsPageModule' },
  { path: 'last-quarter-reports', loadChildren: '../pages/reports/last-quarter/last-quarter-reports.module#LastQuarterReportsPageModule' },
  { path: 'my-downloads', loadChildren: '../pages/my/downloads/my-downloads.module#MyDownloadsPageModule' },
  { path: 'my-courses', loadChildren: '../pages/my/courses/my-courses.module#MyCoursesPageModule' },
  { path: 'roles', loadChildren: '../pages/roles/roles.module#RolesPageModule' },
   { path: 'fullreports/:state', loadChildren: '../pages/reports/full/fullreports.module#FullreportsPageModule' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
