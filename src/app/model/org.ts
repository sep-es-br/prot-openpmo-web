import { Actor } from "./actor";

export class Org extends Actor{
    sector: OrgSector;
}

enum OrgSector {
    PUBLIC = "Public",
    PRIVATE = "Private",
    THIRD = "Third"
}
