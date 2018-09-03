import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { OfficeListComponent } from './office_old/office-list/office-list.component';
// import { OfficeListResolver } from './office_old/OfficeListResolver';
// import { OfficeEditComponent } from './office_old/office-edit/office-edit.component';
// import { OfficeResolver } from './office_old/OfficeResolver';
// import { SchemaListComponent } from './management/schema/schema-list/schema-list.component';
// import { SchemaListResolver } from './management/schema/SchemaListResolver';
// import { SchemaEditComponent } from './management/schema/schema-edit/schema-edit.component';
// import { SchemaResolver } from './management/schema/SchemaResolver';
// import { WorkpackListComponent } from './management/workpack/workpack-list/workpack-list.component';
// import { WorkpackListResolver } from './management/workpack/WorkpackListResolver';
// import { WorkpackResolver } from './management/workpack/WorkpackResolver';
// import { WorkpackEditComponent } from './management/workpack/workpack-edit/workpack-edit.component';
// import { SchemaTemplateListComponent } from './admin/schema-template/schema-template-list/schema-template-list.component';
// import { SchemaTemplateEditComponent } from './admin/schema-template/schema-template-edit/schema-template-edit.component';
// import { SchemaTemplateListResolver } from './admin/schema-template/SchemaTemplateListResolver';
// import { SchemaTemplateResolver } from './admin/schema-template/SchemaTemplateResolver';
// import { WorkpackTemplateListComponent } from './admin/workpack-template/workpack-template-list/workpack-template-list.component';
// import { WorkpackTemplateListResolver } from './admin/workpack-template/WorkpackTemplateListResolver';
// import { WorkpackTemplateResolver } from './admin/workpack-template/WorkpackTemplateResolver';
// import { WorkpackTemplateEditComponent } from './admin/workpack-template/workpack-template-edit/workpack-template-edit.component';
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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'office/:action/:id',
    component: OfficeComponent
  },
  {
    path: 'schema/:action/:id',
    component: SchemaComponent
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
