import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatIconModule} from '@angular/material/icon';
import { RCardComponent } from './components/r-card/r-card.component';
import { HomeComponent } from './components/home/home.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { MyReportsComponent } from './components/my-reports/my-reports.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { StatsComponent } from './components/stats/stats.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import { ReportViewLayoutComponent } from './layouts/report-view-layout/report-view-layout.component';
import { ReportViewerComponent } from './components/report-viewer/report-viewer.component';
import { GroupLayoutComponent } from './layouts/group-layout/group-layout.component';
import { GroupsComponent } from './components/groups/groups.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SidebarComponent,
    ProfileComponent,
    RCardComponent,
    HomeComponent,
    BookmarksComponent,
    MyReportsComponent,
    ReportFormComponent,
    StatsComponent,
    LoginComponent,
    ReportViewLayoutComponent,
    ReportViewerComponent,
    GroupLayoutComponent,
    GroupsComponent,
    NewGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    FlexLayoutModule,
    MatCardModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
