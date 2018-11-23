import { WorkpackModel } from "./workpack-model";
import { Property } from "./property";

export class Workpack {
    id: String = "";
    name: String = "";
    properties: Property[] = [];
    components: Workpack[] = [];
    model: WorkpackModel = new WorkpackModel();
}
