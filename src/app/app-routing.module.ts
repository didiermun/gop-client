import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component'
import {HomeComponent} from './components/home/home.component'
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyReportsComponent } from './components/my-reports/my-reports.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent} from './components/login/login.component';
import {ReportViewerComponent} from './components/report-viewer/report-viewer.component'
import {ReportViewLayoutComponent} from './layouts/report-view-layout/report-view-layout.component'
import { GroupLayoutComponent } from './layouts/group-layout/group-layout.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AuthGuardService } from './services/guards/authGaurd.service'
import { AppIndexComponent } from './components/app-index/app-index.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  { path: '',   component: AppIndexComponent },
  {path: '', component: ReportViewLayoutComponent, canActivate: [AuthGuardService],
  children:[
    {path: 'report/:report_id',component: ReportViewerComponent},
  ]},
  {path: '', component: GroupLayoutComponent, canActivate: [AuthGuardService],children:[
    {path: 'groups', component: GroupsComponent}
  ]},
  {path:'',component:DefaultLayoutComponent, canActivate: [AuthGuardService],
  children:[
   {path: 'reports',component:HomeComponent},
   {path: 'bookmarks', component:BookmarksComponent},
   {path: 'mine-gops',component: MyReportsComponent},
   {path: 'new-gop',component: ReportFormComponent},
   {path: 'stats',component:StatsComponent},
  ]
 },
 {path: '**',   redirectTo: '/reports', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
