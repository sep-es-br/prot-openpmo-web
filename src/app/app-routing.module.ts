import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OfficeComponent } from './components/office/office.component';
import { SchemaComponent } from './components/schema/schema.component';
import { WorkpackComponent } from './components/workpack/workpack.component';
import { WorkpackResolver } from './components/workpack/workpack.resolver';
import { OfficeAdminComponent } from './components/office-admin/office-admin.component';
import { SchemaTemplateComponent } from './components/schema-template/schema-template.component';
import { WorkpackTemplateComponent } from './components/workpack-template/workpack-template.component';
import { WorkpackTemplateResolver } from './components/workpack-template/workpack-template.resolver';
import { SchemaResolver } from './components/schema/schema.resolver';
import { OfficeResolver } from './components/office/office.resolver';
import { OfficeAdminResolver } from './components/office-admin/office-admin.resolver';
import { SchemaTemplateResolver } from './components/schema-template/schema-template.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'office/:action/:id',
    component: OfficeComponent,
    resolve: {      
      office: OfficeResolver
    }
  },
  {
    path: 'schema/:action/:id',
    component: SchemaComponent,
    resolve: {      
      schema: SchemaResolver
    }
  },
  {
    path: 'workpack/:action/:id',
    component: WorkpackComponent,
    resolve: {      
      workpack: WorkpackResolver
    }
  },
  {
    path: 'officeadmin/:action/:id',
    component: OfficeAdminComponent,
    resolve: {      
      officeadmin: OfficeAdminResolver
    }
  },
  {
    path: 'schematemplate/:action/:id',
    component: SchemaTemplateComponent,
    resolve: {      
      schematemplate: SchemaTemplateResolver
    }
  },
  {
    path: 'workpacktemplate/:action/:id',
    component: WorkpackTemplateComponent,
    resolve: {
      workpacktemplate: WorkpackTemplateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
