import { Plan } from '../model/plan';
import { PlanStructure } from '../model/plan-structure';

export class Office {
    id: String = "";
    name: String = "";
    fullName: String = "";
    plans: Plan[] = [];
    planStructures: PlanStructure[] = [];
}
