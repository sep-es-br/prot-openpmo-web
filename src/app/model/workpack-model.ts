import { PropertyProfile } from "./property-profile";

export class WorkpackModel {
    id: String = null;
    name: String = "";
    components: WorkpackModel[] = [];
    propertyProfiles: PropertyProfile[] = [];
    manageStakeholders: Boolean = true;
    personPossibleRoles: String[] = [];
    orgPossibleRoles: String[] = [];
}