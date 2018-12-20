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
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { LocaleService } from './services/locale/locale-service.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PeopleComponent } from './components/admin/people/people.component';
import { PersonComponent } from './components/admin/people/person/person.component';
import { OrgComponent } from './components/admin/orgs/org/org.component';
import { OrgsComponent } from './components/admin/orgs/orgs.component';
import { PersonRoleComponent } from './components/workpack/person-role/person-role.component';
import { SecurityModule } from './security/security.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './security/auth.service';
import { AuthClientHttp } from './security/auth-client-http';
import { MenuComponent } from './menu/menu.component';
import { PhonePipe } from './pipes/pipe-phone';
import { Util } from './utils';
import { ErrorMessagingService } from './services/error/error-messaging.service';
import { OrgRoleComponent } from './components/workpack/org-role/org-role.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

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
    PeopleComponent,
    PersonComponent,
    OrgsComponent,
    OrgComponent,
    PersonRoleComponent,
    LoginComponent,
    MenuComponent,
    PhonePipe,
    OrgRoleComponent,
    LoginComponent
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
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SecurityModule
  ],
  providers: [
    OfficeDataService,
    PlanDataService,
    WorkpackDataService,
    BreadcrumbService,    
    LocaleService,
    CookieService,
    WorkpackResolver,
    PlanResolver,
    PlanStructureResolver,
    OfficeResolver,
    OfficeAdminResolver,
    WorkpackModelResolver,
    SecurityModule,
    AuthService,
    AuthClientHttp,
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    Util,
    ErrorMessagingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
