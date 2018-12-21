import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OfficeComponent } from './components/office/office.component';
import { PlanComponent } from './components/plan/plan.component';
import { WorkpackComponent } from './components/workpack/workpack.component';
import { WorkpackResolver } from './components/workpack/workpack.resolver';
import { OfficeAdminComponent } from './components/office-admin/office-admin.component';
import { PlanStructureComponent } from './components/plan-structure/plan-structure.component';
import { WorkpackModelComponent } from './components/workpack-model/workpack-model.component';
import { WorkpackModelResolver } from './components/workpack-model/workpack-model.resolver';
import { PlanResolver } from './components/plan/plan.resolver';
import { OfficeResolver } from './components/office/office.resolver';
import { OfficeAdminResolver } from './components/office-admin/office-admin.resolver';
import { PlanStructureResolver } from './components/plan-structure/plan-structure.resolver';
import { PeopleComponent } from './components/admin/people/people.component';
import { PersonComponent } from './components/admin/people/person/person.component';
import { OrgsComponent } from './components/admin/orgs/orgs.component';
import { OrgComponent } from './components/admin/orgs/org/org.component';
import { PersonRoleComponent } from './components/workpack/person-role/person-role.component';
import { LoginComponent } from './components/login/login.component';
import { OrgRoleComponent } from './components/workpack/org-role/org-role.component';
import { LocalitiesComponent } from './components/admin/localities/localities.component';
import { LocalityComponent } from './components/admin/localities/locality/locality.component';
//import { LoginComponent } from './security/login/login.component';

////////////////////////////////////////////////////////////////////////
// ROUTES DEFINITION:
//
// path: leads to the route
// resolver: Service to be run before loading interface
// runGuardsAndResolvers: defines actions to be taken when updating the page
//
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
    path: 'plan/:action/:id',
    component: PlanComponent,
    resolve: {      
      plan: PlanResolver
    }
  },
  {
    path: 'workpack/:action/:id',
    component: WorkpackComponent,
    resolve: {      
      workpack: WorkpackResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'workpack/:wpid/personrole/:id',
    component: PersonRoleComponent
  },
  {
    path: 'workpack/:wpid/organizationrole/:id',
    component: OrgRoleComponent
  },
  {
    path: 'officeadmin/:action/:id',
    component: OfficeAdminComponent,
    resolve: {      
      officeadmin: OfficeAdminResolver
    }
  },
  {
    path: 'planstructure/:action/:id',
    component: PlanStructureComponent,
    resolve: {      
      planstructure: PlanStructureResolver
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'workpackmodel/:action/:id',
    component: WorkpackModelComponent,
    resolve: {
      workpackmodel: WorkpackModelResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },  
  {
    path: 'person',
    component: PeopleComponent
  },
  {
    path: 'person/:id',
    component: PersonComponent
  },
  {
    path: 'org',
    component: OrgsComponent
  },
  {
    path: 'org/:id',
    component: OrgComponent
  },
  {
    path: 'locality',
    component: LocalitiesComponent
  },
  {
    path: 'locality/:id',
    component: LocalityComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
