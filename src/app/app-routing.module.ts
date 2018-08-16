import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EnvironmentListComponent } from './environment/environment-list/environment-list.component';
import { EnvironmentListResolver } from './environment/EnvironmentListResolver';
import { EnvironmentEditComponent } from './environment/environment-edit/environment-edit.component';
import { EnvironmentResolver } from './environment/EnvironmentResolver';

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

const routes: Routes = [
  {
    path: '', // redirectTo: 'environments',
    component: EnvironmentListComponent,
    resolve: {
      environments: EnvironmentListResolver
    }
  },

  {
    path: 'environments',
    component: EnvironmentListComponent,
    resolve: {
      environments: EnvironmentListResolver
    }
  },
  { // New environment
    path: 'environment',
    component: EnvironmentEditComponent
  },
  { // Edit an environment
    path: 'environment/:id',
    component: EnvironmentEditComponent,
    resolve: {
      environment: EnvironmentResolver
    }
  },
  {
    path: 'schemas/:id',
    component: SchemaListComponent,
    resolve: {
      schemas: SchemaListResolver,
      environment: EnvironmentResolver
    }

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
  {
    path: 'schematemplates/:id',
    component: SchemaTemplateListComponent,
    resolve: {
      schematemplates: SchemaTemplateListResolver,
      environment: EnvironmentResolver
    }
  },
  { // New/edit schema template
    path: 'schematemplate/:action/:id',
    component: SchemaTemplateEditComponent,
    resolve: {
      schematemplate: SchemaTemplateResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
