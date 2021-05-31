import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component'
import {HomeComponent} from './components/home/home.component'

const routes: Routes = [{path:'',component:DefaultLayoutComponent,children:[
   {path: '',component:HomeComponent}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
