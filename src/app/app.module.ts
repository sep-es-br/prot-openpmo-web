import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { WorkpackTemplateService } from './services/workpack-template.service';
import { EnvironmentListComponent } from './environment/environment-list/environment-list.component';

// primeng imports
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { EnvironmentEditComponent } from './environment/environment-edit/environment-edit.component';
import { SchemaListComponent } from './schema/schema-list/schema-list.component';
import { SchemaEditComponent } from './schema/schema-edit/schema-edit.component';
import { WorkpackEditComponent } from './workpack/workpack-edit/workpack-edit.component';
import { WorkpackListComponent } from './workpack/workpack-list/workpack-list.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EnvironmentListComponent,
    EnvironmentEditComponent,
    SchemaListComponent,
    SchemaEditComponent,
    WorkpackEditComponent,
    WorkpackListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    AppRoutingModule
    BreadcrumbModule,
    CardModule,
    TooltipModule
  ],
  providers: [
    WorkpackTemplateService,
    HttpClient
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
