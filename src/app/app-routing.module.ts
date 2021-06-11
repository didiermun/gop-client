import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component'
import {HomeComponent} from './components/home/home.component'
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyReportsComponent } from './components/my-reports/my-reports.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'report/:report_id',component: ReportFormComponent},
  {path:'',component:DefaultLayoutComponent,
  children:[
   {path: 'reports',component:HomeComponent},
   {path: 'bookmarks', component:BookmarksComponent},
   {path: 'mine-gops',component: MyReportsComponent},
   {path: 'new-gop',component: ReportFormComponent},
   {path: 'stats',component:StatsComponent},
   { path: '',   redirectTo: '/reports', pathMatch: 'full' },
  ]
 },
 {path: '**',   redirectTo: '/reports', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
