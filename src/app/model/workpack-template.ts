import { Property } from "./property";

export class WorkpackTemplate {
    id: String = "";
    name: String = "";
    shortName: String = "";
    components: WorkpackTemplate[] = [];
    properties: Property[] = [];
}