import { WorkpackModel } from "./workpack-model";

export class PlanStructure {
    id: String = "";
    name: String = "";
    fullName: String = "";
    workpackModels: WorkpackModel[] = [];
    model: PlanStructure[] = [];
}