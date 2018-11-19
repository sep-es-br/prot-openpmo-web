import { Workpack } from "./workpack";
import { SchemaTemplate } from "./schema-template";

export class Schema {
    id: String = '';
    name: String = '';
    fullName: String = '';
    workpacks: Workpack[] = [];
    template: SchemaTemplate = new SchemaTemplate();
}
