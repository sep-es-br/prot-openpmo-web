import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppMatModule } from './app.mat.module';
import { AppComponent } from './app.component';
import { OfficeDataService } from './services/data/office/office-data.service';

import { AppRoutingModule } from './/app-routing.module';

import { WorkpackResolver } from './components/workpack/workpack.resolver';
import { WorkpackModelResolver } from './components/workpack-model/workpack-model.resolver';
import { NgPipesModule } from 'ngx-pipes';
import { HomeComponent } from './components/home/home.component';
import { OfficeComponent } from './components/office/office.component';
import { PlanComponent } from './components/plan/plan.component';
import { WorkpackComponent } from './components/workpack/workpack.component';
import { PlanStructureComponent } from './components/plan-structure/plan-structure.component';
import { OfficeAdminComponent } from './components/office-admin/office-admin.component';
import { WorkpackModelComponent } from './components/workpack-model/workpack-model.component';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PlanResolver } from './components/plan/plan.resolver';
import { OfficeResolver } from './components/office/office.resolver';
import { CookieService } from 'ngx-cookie-service';
import { OfficeAdminResolver } from './components/office-admin/office-admin.resolver';
import { PlanStructureResolver } from './components/plan-structure/plan-structure.resolver';
import { WorkpackDataService } from './services/data/workpack/workpack-data.service';
import { PlanDataService } from './services/data/plan/plan-data.service';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ProgressComponent } from './components/progress/progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { PeopleComponent } from './components/admin/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfficeComponent,
    PlanComponent,
    WorkpackComponent,
    PlanStructureComponent,
    OfficeAdminComponent,
    WorkpackModelComponent,
    BreadcrumbComponent,
    SanitizeHtmlPipe,
    ProgressComponent,
    MessageDialogComponent,
    PeopleComponent
  ],
  entryComponents: [MessageDialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppMatModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgPipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    OfficeDataService,
    PlanDataService,
    WorkpackDataService,
    BreadcrumbService,
    CookieService,
    WorkpackResolver,
    PlanResolver,
    PlanStructureResolver,
    OfficeResolver,
    OfficeAdminResolver,
    WorkpackModelResolver,
    HttpClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}