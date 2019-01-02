import { Actor } from "./actor";

export class CostEntry {
    id: String = null;
    date: Date;
    stage: CostStage;
    value: Number;
}

export class Cost {
    id: String = null;
    name: String = '';
    fullName: String = '';
    flow: CostEntry[];
    funder: Actor;
}

export enum CostStage {
    PLANNED = 'Planned',
	ESTIMATED = 'Estimated',
	BUDGETED = 'Budgeted',
	AUTHORIZED = 'Authorized',
	COMMITED = 'Commited',
	ACTUAL = 'Actual'
}