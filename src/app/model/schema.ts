import { Workpack } from "./workpack";
import { SchemaTemplate } from "./schema-template";

export class Schema {
    id: String = '';
    name: String = '';
    shortName: String = '';
    workpacks: Workpack[] = [];
    schemaTemplates: SchemaTemplate[] = [];
}
