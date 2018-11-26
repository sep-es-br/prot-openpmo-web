import { PropertyProfile } from "./property-profile";

export class WorkpackModel {
    id: String = "";
    name: String = "";
    components: WorkpackModel[] = [];
    propertyProfiles: PropertyProfile[] = [];
}