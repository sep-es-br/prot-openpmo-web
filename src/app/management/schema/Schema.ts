import { Workpack } from "../workpack/Workpack";
import { SchemaTemplate } from "../../admin/schema-template/SchemaTemplate";

export class Schema {
    id: String = '';
    name: String = '';
    shortName: String = '';
    workpacks: Workpack[] = [];
    schemaTemplates: SchemaTemplate[] = [];
}
