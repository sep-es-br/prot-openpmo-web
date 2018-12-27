import { Actor } from "./actor";

export class CostEntry {
    date: Date;
    stage: CostStage;
    value: Number;
}

export class Cost {
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