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
import { PanelResolver } from './panel.resolver';
import { SchemaResolver } from './schema/schema.resolver';
import { OfficeResolver } from './office/office.resolver';

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
      office: OfficeResolver,
      panel: PanelResolver,
    },
  },
  {
    path: 'schema/:action/:id',
    component: SchemaComponent,
    resolve: {      
      schema: SchemaResolver,
      panel: PanelResolver,
    },
  },
  {
    path: 'workpack/:action/:id',
    component: WorkpackComponent,
    resolve: {      
      workpack: WorkpackResolver,
      panel: PanelResolver,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'officeadmin/:action/:id',
    component: OfficeAdminComponent
  },
  {
    path: 'schematemplate/:action/:id',
    component: SchemaTemplateComponent
  },
  {
    path: 'workpacktemplate/:action/:id',
    component: WorkpackTemplateComponent,
    resolve: {
      workpack: WorkpackTemplateResolver,
      panel: PanelResolver,
    },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
