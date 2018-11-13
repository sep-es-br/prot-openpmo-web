import { PropertyProfile } from "./property-profile";

export class WorkpackTemplate {
    id: String = "";
    name: String = "";
    components: WorkpackTemplate[] = [];
    properties: PropertyProfile[] = [];
}