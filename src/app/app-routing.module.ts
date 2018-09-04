import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OfficeListComponent } from './office/office-list/office-list.component';
import { OfficeListResolver } from './office/OfficeListResolver';
import { OfficeEditComponent } from './office/office-edit/office-edit.component';
import { OfficeResolver } from './office/OfficeResolver';
import { SchemaListComponent } from './management/schema/schema-list/schema-list.component';
import { SchemaListResolver } from './management/schema/SchemaListResolver';
import { SchemaEditComponent } from './management/schema/schema-edit/schema-edit.component';
import { SchemaResolver } from './management/schema/SchemaResolver';
import { WorkpackListComponent } from './management/workpack/workpack-list/workpack-list.component';
import { WorkpackListResolver } from './management/workpack/WorkpackListResolver';
import { WorkpackResolver } from './management/workpack/WorkpackResolver';
import { WorkpackEditComponent } from './management/workpack/workpack-edit/workpack-edit.component';
import { SchemaTemplateListComponent } from './admin/schema-template/schema-template-list/schema-template-list.component';
import { SchemaTemplateEditComponent } from './admin/schema-template/schema-template-edit/schema-template-edit.component';
import { SchemaTemplateListResolver } from './admin/schema-template/SchemaTemplateListResolver';
import { SchemaTemplateResolver } from './admin/schema-template/SchemaTemplateResolver';
import { WorkpackTemplateListComponent } from './admin/workpack-template/workpack-template-list/workpack-template-list.component';
import { WorkpackTemplateListResolver } from './admin/workpack-template/WorkpackTemplateListResolver';
import { WorkpackTemplateResolver } from './admin/workpack-template/WorkpackTemplateResolver';
import { WorkpackTemplateEditComponent } from './admin/workpack-template/workpack-template-edit/workpack-template-edit.component';

const routes: Routes = [
  {
    path: '', // redirectTo: 'offices',
    component: OfficeListComponent,
    resolve: {
      offices: OfficeListResolver
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },

  {
    path: 'offices/:id',
    component: OfficeListComponent,
    resolve: {
      offices: OfficeListResolver
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"

  },
  { // New office
    path: 'office',
    component: OfficeEditComponent
  },
  { // Edit an office
    path: 'office/:action/:id',
    component: OfficeEditComponent,
    resolve: {
      office: OfficeResolver
    }
  },
  {
    path: 'schemas/:id',
    component: SchemaListComponent,
    resolve: {
      schemas: SchemaListResolver,
      office: OfficeResolver
    },
    runGuardsAndResolvers: "always"

  },
  { // New/edit schema
    path: 'schema/:action/:id',
    component: SchemaEditComponent,
    resolve: {
      schema: SchemaResolver
    }
  },
  {
    path: 'rootworkpacks/:id',
    component: WorkpackListComponent,
    resolve: {
      schema: SchemaResolver,
      workpacks: WorkpackListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'workpacks/:id',
    component: WorkpackListComponent,
    resolve: {
      workpack: WorkpackResolver,
      workpacks: WorkpackListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { // New/edit Workpack
    path: 'workpack/:action/:id',
    component: WorkpackEditComponent,
    resolve: {
      workpack: WorkpackResolver
    }
  },
  { // Schema Templates
    path: 'schematemplates/:id',
    component: SchemaTemplateListComponent,
    resolve: {
      schematemplates: SchemaTemplateListResolver,
      office: OfficeResolver
    }
  },
  { // New/edit schema template
    path: 'schematemplate/:action/:id',
    component: SchemaTemplateEditComponent,
    resolve: {
      schematemplate: SchemaTemplateResolver
    }
  },
  { // Root Workpack Templates
    path: 'rootworkpacktemplates/:id',
    component: WorkpackTemplateListComponent,
    resolve: {
      schematemplate: SchemaTemplateResolver,
      workpacktemplates: WorkpackTemplateListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { // Workpack Templates
    path: 'workpacktemplates/:id',
    component: WorkpackTemplateListComponent,
    resolve: {
      workpacktemplate: WorkpackTemplateResolver,
      workpacktemplates: WorkpackTemplateListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { // New/edit Workpack Template
    path: 'workpacktemplate/:action/:id',
    component: WorkpackTemplateEditComponent,
    resolve: {
      workpacktemplate: WorkpackTemplateResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
