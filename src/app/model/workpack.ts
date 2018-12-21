import { WorkpackModel } from "./workpack-model";
import { Property } from "./property";
import { Scope } from "./scope";
import { GeoReference } from "./geo-reference";

export class Workpack extends Scope{
    properties: Property[] = [];
    components: Workpack[] = [];
    model: WorkpackModel = new WorkpackModel();
    geoReferences: GeoReference[] = [];
}
