import { Property } from "./property";

export class WorkpackTemplate {
    id: String = "";
    name: String = "";
    fullName: String = "";
    components: WorkpackTemplate[] = [];
    properties: Property[] = [];
}