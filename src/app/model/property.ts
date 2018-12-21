import { PropertyProfile } from "./property-profile";
import { Locality } from "./locality";

export class Property {
    id: String = null;
    name: String;
    value: any;
    localities: Locality[] = [];
    profile: PropertyProfile;
}
