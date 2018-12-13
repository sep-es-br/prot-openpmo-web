import { Workpack } from "./workpack";
import { PlanStructure } from "./plan-structure";
import { Scope } from "./scope";

export class Plan extends Scope{
    workpacks: Workpack[] = [];
    structure: PlanStructure = new PlanStructure();
}
