import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppMatModule } from './app.mat.module';
import { AppComponent } from './app.component';
import { OfficeDataService } from './services/data/office/office-data.service';

import { AppRoutingModule } from './/app-routing.module';

import { WorkpackResolver } from './components/workpack/workpack.resolver';
import { WorkpackTemplateResolver } from './components/workpack-template/workpack-template.resolver';
import { NgPipesModule } from 'ngx-pipes';
import { HomeComponent } from './components/home/home.component';
import { OfficeComponent } from './components/office/office.component';
import { SchemaComponent } from './components/schema/schema.component';
import { WorkpackComponent } from './components/workpack/workpack.component';
import { SchemaTemplateComponent } from './components/schema-template/schema-template.component';
import { OfficeAdminComponent } from './components/office-admin/office-admin.component';
import { WorkpackTemplateComponent } from './components/workpack-template/workpack-template.component';
import { PropertyTemplateComponent } from './components/workpack-template/property-template/property-template.component';
import { Useful } from './useful';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SchemaResolver } from './components/schema/schema.resolver';
import { OfficeResolver } from './components/office/office.resolver';
import { CookieService } from 'ngx-cookie-service';
import { OfficeAdminResolver } from './components/office-admin/office-admin.resolver';
import { SchemaTemplateResolver } from './components/schema-template/schema-template.resolver';
import { WorkpackDataService } from './services/data/workpack/workpack-data.service';
import { SchemaDataService } from './services/data/schema/schema-data.service';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ProgressComponent } from './components/progress/progress.component';


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
    PropertyTemplateComponent,
    BreadcrumbComponent,
    SanitizeHtmlPipe,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppMatModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule
  ],
  providers: [
    OfficeDataService,
    SchemaDataService,
    WorkpackDataService,
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

export class AppModule {
}
