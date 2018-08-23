import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataService } from './data.service';

import { AppRoutingModule } from './/app-routing.module';
import { ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';

import { OfficeListComponent } from './office/office-list/office-list.component';
import { OfficeEditComponent } from './office/office-edit/office-edit.component';import { SchemaListComponent } from './management/schema/schema-list/schema-list.component';
import { SchemaEditComponent } from './management/schema/schema-edit/schema-edit.component';
import { WorkpackEditComponent } from './management/workpack/workpack-edit/workpack-edit.component';
import { WorkpackListComponent } from './management/workpack/workpack-list/workpack-list.component';

import { OfficeResolver } from './office/OfficeResolver';
import { OfficeListResolver } from './office/OfficeListResolver';
import { SchemaResolver } from './management/schema/SchemaResolver';
import { SchemaListResolver } from './management/schema/SchemaListResolver';
import { WorkpackResolver } from './management/workpack/WorkpackResolver';
import { WorkpackListResolver } from './management/workpack/WorkpackListResolver';
import { SchemaTemplateEditComponent } from './admin/schema-template/schema-template-edit/schema-template-edit.component';
import { SchemaTemplateListComponent } from './admin/schema-template/schema-template-list/schema-template-list.component';
import { SchemaTemplateResolver } from './admin/schema-template/SchemaTemplateResolver';
import { SchemaTemplateListResolver } from './admin/schema-template/SchemaTemplateListResolver';
import { WorkpackTemplateListComponent } from './admin/workpack-template/workpack-template-list/workpack-template-list.component';
import { WorkpackTemplateEditComponent } from './admin/workpack-template/workpack-template-edit/workpack-template-edit.component';
import { WorkpackTemplateResolver } from './admin/workpack-template/WorkpackTemplateResolver';
import { WorkpackTemplateListResolver } from './admin/workpack-template/WorkpackTemplateListResolver';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    AppComponent,
    OfficeListComponent,
    OfficeEditComponent,
    SchemaListComponent,
    SchemaEditComponent,
    WorkpackEditComponent,
    WorkpackListComponent,
    SchemaTemplateEditComponent,
    SchemaTemplateListComponent,
    WorkpackTemplateListComponent,
    WorkpackTemplateEditComponent
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
    OfficeResolver,
    OfficeListResolver,
    SchemaResolver,
    SchemaListResolver,
    WorkpackResolver,
    WorkpackListResolver,
    SchemaTemplateResolver,
    SchemaTemplateListResolver,
    WorkpackTemplateResolver,
    WorkpackTemplateListResolver,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
