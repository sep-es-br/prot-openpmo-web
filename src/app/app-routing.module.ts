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

const routes: Routes = [
  {
    path: '', //redirectTo: 'environments',
    component: EnvironmentListComponent
  },  

  {
    path: 'environments',
    component: EnvironmentListComponent,
  },
  { // New environment
    path: 'environment',
    component: EnvironmentEditComponent
  },
  { // Edit an environment
    path: 'environment/:id',
    component: EnvironmentEditComponent
  },
  {
    path: 'schemas/:containerid',
    component: SchemaListComponent
  },
  { // New/edit schema
    path: 'schema/:action/:id',
    component: SchemaEditComponent
  },
  {
    path: 'workpacks/:containerid', 
    component: WorkpackListComponent
  },
  { // New/edit Workpack
    path: 'workpack/:action/:id', 
    component: WorkpackEditComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
