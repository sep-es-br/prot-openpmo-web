import { WorkpackModel } from "./workpack-model";
import { Property } from "./property";
import { Scope } from "./scope";
import { GeoReference } from "./geo-reference";
import { Cost } from "./cost";

export class Workpack extends Scope{
    properties: Property[] = [];
    components: Workpack[] = [];
    model: WorkpackModel = new WorkpackModel();
    geoReferences: GeoReference[] = [];
    costs: Cost[] = [];
}
