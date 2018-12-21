export class Locality {
    id: String = null;
    code: String = '';
    name: String = '';
    fullName: String = '';
    type: LocalityType = LocalityType.ANY;
    GPS_Latitude: Number;
    GPS_Longitude: Number;
    container: Locality = null;
}

export enum LocalityType {
    "ANY" = "Any",
    "COUNTRY" = "Country",
    "REGION" = "Region",
    "STATE" = "State",
    "COUNTY" = "County",
    "CITY" = "City",
    "DISTRICT" = "District",
    "NEIGHBORHOOD" = "Neighborhood",
    "SITE" = "Site",
    "PROVINCE" = "Province",
    "ZONE" = "Zone"
}