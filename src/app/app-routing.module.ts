import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component'
import {HomeComponent} from './components/home/home.component'
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyReportsComponent } from './components/my-reports/my-reports.component';

const routes: Routes = [{path:'',component:DefaultLayoutComponent,children:[
   {path: '',component:HomeComponent},
   {path: 'bookmarks', component:BookmarksComponent},
   {path: 'my-gops',component: MyReportsComponent}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
