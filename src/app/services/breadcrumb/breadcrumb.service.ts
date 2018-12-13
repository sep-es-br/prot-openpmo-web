import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Office } from '../../model/office';
import { Plan } from '../../model/plan';
import { Workpack } from '../../model/workpack';
import { CookieService } from 'ngx-cookie-service';
import { PlanStructure } from '../../model/plan-structure';
import { WorkpackModel } from '../../model/workpack-model';

@Injectable({
  providedIn: 'root'
})
export class Breadcrumb {
  label: String = '';
  route: String = '';
  id: String = '';
  modelId: String = '';
  action: String = '';
  active: Boolean = false; 
}
@Injectable()
export class BreadcrumbService {

  // Observable array of breadcrumb to represent the trail
  private $breadcrumbTrail = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbTrail = this.$breadcrumbTrail.asObservable();

  // Observable to the last office
  private $office = new BehaviorSubject<Office>(new Office);
  office = this.$office.asObservable();

  // Observable to the last plan
  private $plan = new BehaviorSubject<Plan>(new Plan);
  plan = this.$plan.asObservable();

  // Observable to the last plan structure
  private $planStructure = new BehaviorSubject<PlanStructure>(new PlanStructure);
  planStructure = this.$planStructure.asObservable();

  // Observable to the last workpack
  private $workpack = new BehaviorSubject<Workpack>(new Workpack);
  workpack = this.$workpack.asObservable();

  // Observable to the last workpack model
  private $workpackModel = new BehaviorSubject<WorkpackModel>(new WorkpackModel);
  workpackModel = this.$workpackModel.asObservable();

  constructor(private cookie: CookieService) {
    if (cookie.check('breadcrumb')) {
      let jsonBreadcrumb = cookie.get('breadcrumb');
      let breadcrumb = JSON.parse(jsonBreadcrumb) as Breadcrumb[];
      this.$breadcrumbTrail.next(breadcrumb);
    }
  }

  public Add(breadcrumb: Breadcrumb){
    let newTrail: Breadcrumb[] = [];
    this.$breadcrumbTrail.getValue().forEach((crumb, i) => {
      crumb.active = true;
      newTrail.push(crumb);
    });
    newTrail.push(breadcrumb);
    this.$breadcrumbTrail.next(newTrail);
    this.cookie.delete('breadcrumb');
    this.cookie.set('breadcrumb', JSON.stringify(newTrail), 365);
  }

  public GoTo(index){
    let newTrail: Breadcrumb[] = [];
    this.$breadcrumbTrail.getValue().forEach((crumb, i) => {
      if (i <= index) {
        crumb.active = (i < index);
        newTrail.push(crumb);
      }
    });
    this.$breadcrumbTrail.next(newTrail);
    this.cookie.delete('breadcrumb');
    this.cookie.set('breadcrumb', JSON.stringify(newTrail), 365);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Workpack
  //
  // Parameters: workpack to set
  //
  // Return: none
  //
  SetCurrentWorkpack(workpack: Workpack) {
    this.$workpack.next(workpack);
    this.UpdateBreadcrumb(workpack, 'workpack');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Workpack Model
  //
  // Parameters: workpack to set
  //
  // Return: none
  //
  SetCurrentWorkpackModel(workpackModel: WorkpackModel) {
    this.$workpackModel.next(workpackModel);
    this.UpdateBreadcrumb(workpackModel, 'workpackmodel');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Workpack Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpack() {
    this.$workpack.next(new Workpack);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Workpack Model Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpackModel() {
    this.$workpackModel.next(new WorkpackModel);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Plan Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanPlan() {
    this.$plan.next(new Plan);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Plan Structure Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanPlanStructure() {
    this.$planStructure.next(new PlanStructure);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Plan
  //
  // Parameters: plan to set
  //
  // Return: none
  //
  SetCurrentPlan(plan: Plan) {
    this.$plan.next(plan);
    this.UpdateBreadcrumb(plan, 'plan');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Plan Structure
  //
  // Parameters: plan structure to set
  //
  // Return: none
  //
  SetCurrentPlanStructure(planStructure: PlanStructure) {
    this.$planStructure.next(planStructure);
    this.UpdateBreadcrumb(planStructure, 'planstructure');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Office Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanOffice() {
    this.$office.next(new Office);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Office
  //
  // Parameters: office to set
  //
  // Return: none
  //
  SetCurrentOffice(office: Office) {
    this.$office.next(office);
    this.UpdateBreadcrumb(office, 'office');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Office Admin
  //
  // Parameters: office admin to set
  //
  // Return: none
  //
  SetCurrentOfficeAdmin(office: Office) {
    this.$office.next(office);
    this.UpdateBreadcrumb(office, 'officeadmin');
  }

  UpdateBreadcrumb(node: any, route: String) {
    if (node !== undefined){
      let index = this.$breadcrumbTrail.getValue().findIndex(crumb => crumb.id === node.id);
      if (index == -1) {
        let crumb = new Breadcrumb();
        let modelName = '';
        crumb.action = 'edit';
        crumb.active = false;
        crumb.route = route;
        switch (route) {
          case 'office': {
            crumb.modelId = '';
            modelName = 'office';
            crumb.label = node.name;
            break;
          }
          case 'officeadmin': {
            crumb.modelId = '';
            crumb.label = node.name + " Administration"
            modelName = 'officeadmin';
            break;
          }
          case 'planstructure': {
            crumb.modelId = '';
            modelName = 'planstructure';
            crumb.label = node.name;
            break;
          }
          case 'workpackmodel': {
            crumb.modelId = '';
            modelName = 'workpackmodel';
            crumb.label = node.name;
            break;
          }
          case 'workpack':{
            crumb.modelId = '&' + node.model.id;
            modelName = node.model.name;
            crumb.label = node.name;
            break;
          }
          case 'plan':{
            crumb.modelId = '&' + node.structure.id;
            modelName = node.structure.name;
            crumb.label = node.name;
            break;
          }
          case 'person':{
            crumb.modelId = '';
            modelName = 'person';
            crumb.label = node.name;
            crumb.action = '';
            break;
          }
          case 'org':{
            crumb.modelId = '';
            modelName = 'organization';
            crumb.label = node.name;
            crumb.action = '';
            break;
          }
        }
        if (node.id == 'new') {
          crumb.id = 'new';
          crumb.label = 'New ' + modelName;
          crumb.action = 'new';
        }
        else {
          crumb.id = node.id;
        }
        this.Add(crumb);
      }
      else {
        this.$breadcrumbTrail.value[index].label = node.name;
        this.GoTo(index);
      }
    }
  }

  GetLast(): Breadcrumb {
    let lastIndex = this.$breadcrumbTrail.getValue().length - 1;

    return (lastIndex >= 0) ? this.$breadcrumbTrail.getValue()[lastIndex] : null;
  }

  GetBeforeLast(n: number): Breadcrumb {
    let lastIndex = this.$breadcrumbTrail.getValue().length - 1 - n;

    return (lastIndex >= 0) ? this.$breadcrumbTrail.getValue()[lastIndex] : null;
  }


}
