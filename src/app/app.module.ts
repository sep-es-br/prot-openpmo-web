import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { WorkpackTemplateService } from './services/workpack-template.service';
import { EnvironmentListComponent } from './environment/environment-list/environment-list.component';

import { CardModule } from 'primeng/card';
import { EnvironmentEditComponent } from './environment/environment-edit/environment-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EnvironmentListComponent,
    EnvironmentEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule
  ],
  providers: [
    WorkpackTemplateService,
    HttpClient
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
