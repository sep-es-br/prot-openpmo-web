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
    SYSTEM = "System",
    BUSINESS = "Business"
};

export enum ScopeType {
    OFFICE = "Office",
    PLAN = "Plan",
    WORKPACK = "Workpack"
};

export enum ActorType {
    PERSON = "Person",
    ORGANIZATION = "Organization"
};