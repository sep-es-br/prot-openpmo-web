// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  databaseHost: 'http://localhost:4200/',
  baseAPIPath: 'api/',
  officeAPI: 'office/',
  schemaAPI: 'schema/',
  listSchemasFunction: 'listschemas/',
  workpackAPI: 'workpack/',
  listWorkpacksFunction: 'listworkpacks/',
  schemaTemplateAPI: 'schematemplate/',
  listSchemaTemplatesFunction: 'listschematemplates/',
  workpackTemplateAPI: 'workpacktemplate/',
  propertyAPI: 'property/',
  textPropertyAPI: 'textproperty/',
  numberPropertyAPI: 'numberproperty/',
  addressPropertyAPI: 'addressproperty/',
  listWorkpackTemplatesFunction: 'listworkpacktemplates/',
  treeResource: 'tree/',
  defaultResource: 'default/',
  templateResource: 'template/',
  propertyTypesResource: 'listpropertytypes/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
