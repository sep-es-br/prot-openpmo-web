import { WorkpackTemplate } from "./workpack-template";

export class SchemaTemplate {
    id: String = "";
    name: String = "";
    shortName: String = "";
    workpackTemplates: WorkpackTemplate[] = [];
    template: SchemaTemplate[] = [];
}