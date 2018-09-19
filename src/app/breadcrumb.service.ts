import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Office } from './model/office';
import { Schema } from './model/schema';
import { Workpack } from './model/workpack';
import { CookieService } from 'ngx-cookie-service';
import { SchemaTemplate } from './model/schema-template';
import { WorkpackTemplate } from './model/workpack-template';

@Injectable({
  providedIn: 'root'
})
export class Breadcrumb {
  label: String = '';
  route: String = '';
  id: String = '';
  templateId: String = '';
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

  // Observable to the last schema
  private $schema = new BehaviorSubject<Schema>(new Schema);
  schema = this.$schema.asObservable();

  // Observable to the last schema template
  private $schemaTemplate = new BehaviorSubject<SchemaTemplate>(new SchemaTemplate);
  schemaTemplate = this.$schemaTemplate.asObservable();

  // Observable to the last workpack
  private $workpack = new BehaviorSubject<Workpack>(new Workpack);
  workpack = this.$workpack.asObservable();

  // Observable to the last workpack template
  private $workpackTemplate = new BehaviorSubject<WorkpackTemplate>(new WorkpackTemplate);
  workpackTemplate = this.$workpackTemplate.asObservable();

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
  // Set the curruent Workpack Template
  //
  // Parameters: workpack to set
  //
  // Return: none
  //
  SetCurrentWorkpackTemplate(workpackTemplate: WorkpackTemplate) {
    this.$workpackTemplate.next(workpackTemplate);
    this.UpdateBreadcrumb(workpackTemplate, 'workpacktemplate');
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
  // Clean the Workpack Template Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanWorkpackTemplate() {
    this.$workpackTemplate.next(new WorkpackTemplate);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Schema Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanSchema() {
    this.$schema.next(new Schema);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Clean the Schema Template Observable
  //
  // Parameters: none
  //
  // Return: none
  //
  CleanSchemaTemplate() {
    this.$schemaTemplate.next(new SchemaTemplate);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Schema
  //
  // Parameters: schema to set
  //
  // Return: none
  //
  SetCurrentSchema(schema: Schema) {
    this.$schema.next(schema);
    this.UpdateBreadcrumb(schema, 'schema');
  }

  ////////////////////////////////////////////////////////////////////////
  //
  // Set the curruent Schema Template
  //
  // Parameters: schema template to set
  //
  // Return: none
  //
  SetCurrentSchemaTemplate(schemaTemplate: SchemaTemplate) {
    this.$schemaTemplate.next(schemaTemplate);
    this.UpdateBreadcrumb(schemaTemplate, 'schematemplate');
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
    if ((node !== undefined) && (node.id !== '')){
      let index = this.$breadcrumbTrail.getValue().findIndex(crumb => crumb.id == node.id);
      if (index == -1) {
        this.Add({
          action: 'children',
          active: false,
          id: node.id,
          templateId: (node.template) ? '&' + node.template.id : '',
          label: node.name,
          route: route
        })
      }
      else {
        this.GoTo(index);
      }
    }
  }

  GetLast(): Breadcrumb {
    let lastIndex = this.$breadcrumbTrail.getValue().length - 1;

    return (lastIndex >= 0) ? this.$breadcrumbTrail.getValue()[lastIndex] : null;
  }


}
