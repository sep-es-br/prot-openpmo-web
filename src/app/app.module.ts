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
import { NgPipesModule } from 'ngx-pipes';
import { HomeComponent } from './home/home.component';
import { OfficeComponent } from './office/office.component';
import { SchemaComponent } from './schema/schema.component';
import { WorkpackComponent } from './workpack/workpack.component';
import { SchemaTemplateComponent } from './schema-template/schema-template.component';
import { OfficeAdminComponent } from './office-admin/office-admin.component';
import { WorkpackTemplateComponent } from './workpack-template/workpack-template.component';
import { Useful } from './useful';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SchemaResolver } from './schema/schema.resolver';
import { OfficeResolver } from './office/office.resolver';
import { CookieService } from 'ngx-cookie-service';
import { OfficeAdminResolver } from './office-admin/office-admin.resolver';
import { SchemaTemplateResolver } from './schema-template/schema-template.resolver';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfficeComponent,
    SchemaComponent,
    WorkpackComponent,
    SchemaTemplateComponent,
    OfficeAdminComponent,
    WorkpackTemplateComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgPipesModule,
    TreeviewModule.forRoot(),
  ],
  providers: [
    DataService,
    BreadcrumbService,
    CookieService,
    WorkpackResolver,
    SchemaResolver,
    SchemaTemplateResolver,
    OfficeResolver,
    OfficeAdminResolver,
    WorkpackTemplateResolver,
    HttpClient,
    Useful
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
