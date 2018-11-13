import { WorkpackTemplate } from "./workpack-template";
import { Property } from "./property";

export class Workpack {
    id: String = "";
    name: String = "";
    properties: Property[] = [];
    components: Workpack[] = [];
    template: WorkpackTemplate = new WorkpackTemplate();
}
