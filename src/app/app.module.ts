import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataService } from './data.service';

import { AppRoutingModule } from './/app-routing.module';
import { ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';

import { WorkpackResolver } from './workpack/workpack.resolver';
import { WorkpackTemplateResolver } from './workpack-template/workpack-template.resolver';
import { PanelResolver } from './panel.resolver';
import { NgPipesModule } from 'ngx-pipes';
import { HomeComponent } from './home/home.component';
import { OfficeComponent } from './office/office.component';
import { SchemaComponent } from './schema/schema.component';
import { WorkpackComponent } from './workpack/workpack.component';
import { SchemaTemplateComponent } from './schema-template/schema-template.component';
import { OfficeAdminComponent } from './office-admin/office-admin.component';
import { WorkpackTemplateComponent } from './workpack-template/workpack-template.component';
import { Useful } from './useful';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfficeComponent,
    SchemaComponent,
    WorkpackComponent,
    SchemaTemplateComponent,
    OfficeAdminComponent,
    WorkpackTemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgPipesModule
  ],
  providers: [
    DataService,
    WorkpackResolver,
    WorkpackTemplateResolver,
    PanelResolver,
    HttpClient,
    Useful
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
