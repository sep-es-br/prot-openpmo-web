export const environment = {
  production: true,
  tokenWhitelistedDomains: [ /localhost:8080/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/],
  databaseHost: 'http://ss07.planejamento.es.gov.br/',
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
  personLikeResource: 'like/',
  orgAPI: 'organization/',
  roleAPI: 'role/',
  byScopeIdResource: 'scope/',
  byActorIdResource: 'actor/',
};
