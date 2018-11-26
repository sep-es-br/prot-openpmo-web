import { Workpack } from "./workpack";
import { PlanStructure } from "./plan-structure";

export class Plan {
    id: String = '';
    name: String = '';
    fullName: String = '';
    workpacks: Workpack[] = [];
    structure: PlanStructure = new PlanStructure();
}
