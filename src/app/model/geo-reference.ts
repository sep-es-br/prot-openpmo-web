import { Workpack } from "./workpack";
import { Locality } from "./locality";
import { PropertyProfile } from "./property-profile";

export class GeoReference {
    id: String = null;
    workpack: Workpack = null;
    locality: Locality = null;
    profileId: String = null;    
}