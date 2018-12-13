import { Actor } from "./actor";

export class Org extends Actor{
    sector: OrgSector;
}

enum OrgSector {
    public = "Public",
    private = "Private",
    third = "Third"
}
