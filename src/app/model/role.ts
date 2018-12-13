import { Actor } from "./actor";
import { Scope } from "./scope";

export class Role {
    id: String = null;
    name: String = "";
    category: RoleCategory;
	actorType: ActorType;
	scopeType: ScopeType;    
    actor: Actor;
    scope: Scope;    
}

export enum RoleCategory {
    system = "System",
    business = "Business"
};

export enum ScopeType {
    office = "Office",
    plan = "Plan",
    workpack = "Workpack"
};

export enum ActorType {
    person = "Person",
    organization = "Organization"
};