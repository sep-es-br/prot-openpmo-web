import { WorkpackTemplate } from "./workpack-template";

export class SchemaTemplate {
    id: String = "";
    name: String = "";
    fullName: String = "";
    workpackTemplates: WorkpackTemplate[] = [];
    template: SchemaTemplate[] = [];
}