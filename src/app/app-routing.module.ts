import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EnvironmentListComponent } from './environment/environment-list/environment-list.component';
import { EnvironmentEditComponent } from './environment/environment-edit/environment-edit.component';
import { SchemaListComponent } from './schema/schema-list/schema-list.component';
import { SchemaEditComponent } from './schema/schema-edit/schema-edit.component';
import { WorkpackListComponent } from './workpack/workpack-list/workpack-list.component';
import { WorkpackEditComponent } from './workpack/workpack-edit/workpack-edit.component';
import { CommonModule } from '@angular/common';
import { EnvironmentResolver } from './environment/EnvironmentResolver';
import { EnvironmentListResolver } from './environment/EnvironmentListResolver';
import { SchemaListResolver } from './schema/SchemaListResolver';
import { SchemaResolver } from './schema/SchemaResolver';
import { WorkpackListResolver } from './workpack/WorkpackListResolver';
import { WorkpackResolver } from './workpack/WorkpackResolver';

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
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
