import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfficeComponent } from './office/office.component';
import { SchemaComponent } from './schema/schema.component';
import { WorkpackComponent } from './workpack/workpack.component';
import { WorkpackResolver } from './workpack/workpack.resolver';
import { OfficeAdminComponent } from './office-admin/office-admin.component';
import { SchemaTemplateComponent } from './schema-template/schema-template.component';
import { WorkpackTemplateComponent } from './workpack-template/workpack-template.component';
import { WorkpackTemplateResolver } from './workpack-template/workpack-template.resolver';
import { SchemaResolver } from './schema/schema.resolver';
import { OfficeResolver } from './office/office.resolver';
import { OfficeAdminResolver } from './office-admin/office-admin.resolver';
import { SchemaTemplateResolver } from './schema-template/schema-template.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'office/:action/:id',
    component: OfficeComponent,
    resolve: {      
      office: OfficeResolver
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: 'schema/:action/:id',
    component: SchemaComponent,
    resolve: {      
      schema: SchemaResolver
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: 'workpack/:action/:id',
    component: WorkpackComponent,
    resolve: {      
      workpack: WorkpackResolver
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'officeadmin/:action/:id',
    component: OfficeAdminComponent,
    resolve: {      
      officeadmin: OfficeAdminResolver
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: 'schematemplate/:action/:id',
    component: SchemaTemplateComponent,
    resolve: {      
      schematemplate: SchemaTemplateResolver
    },
    runGuardsAndResolvers: "always"
  },
  {
    path: 'workpacktemplate/:action/:id',
    component: WorkpackTemplateComponent,
    resolve: {
      workpacktemplate: WorkpackTemplateResolver
    },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
