import { WorkpackTemplate } from "./workpack-template";

export class Workpack {
    id: String = "";
    name: String = "";
    shortName: String = "";
    components: Workpack[] = [];
    template: WorkpackTemplate = new WorkpackTemplate();
}
