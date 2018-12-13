import { Plan } from '../model/plan';
import { PlanStructure } from '../model/plan-structure';
import { Scope } from './scope';

export class Office extends Scope {
    plans: Plan[] = [];
    planStructures: PlanStructure[] = [];
}
