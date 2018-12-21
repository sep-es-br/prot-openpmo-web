// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tokenWhitelistedDomains: [ /localhost:8080/, /localhost:4200/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/],
  databaseHost: 'http://localhost:4200/',
  baseAPIPath: 'api/',
  oauthAPI: 'oauth/',
  tokenResource: 'token',
  tokensRevoke: 'tokens/revoke',
  officeAPI: 'office/',
  PlanAPI: 'plan/',
  listPlansFunction: 'listplans/',
  workpackAPI: 'workpack/',
  listWorkpacksFunction: 'listworkpacks/',
  planStructureAPI: 'planstructure/',
  listPlanStructuresFunction: 'listplanstructures/',
  workpackModelAPI: 'workpackmodel/',
  propertyAPI: 'property/',
  textPropertyAPI: 'textproperty/',
  numberPropertyAPI: 'numberproperty/',
  addressPropertyAPI: 'addressproperty/',
  listWorkpackModelsFunction: 'listworkpackmodels/',
  treeResource: 'tree/',
  defaultResource: 'default/',
  modelResource: 'model/',
  propertyTypesResource: 'listpropertytypes/',
  personAPI: 'person/',
  likeResource: 'like/',
  orgAPI: 'organization/',
  localityAPI: 'locality/',
  roleAPI: 'role/',
  geoReferenceAPI: 'georeference',
  byScopeIdResource: 'scope/',
  byActorIdResource: 'actor/',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
