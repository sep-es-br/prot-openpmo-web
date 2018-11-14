export class PropertyProfile {
    id: String = '';
    type: String = '';
    using: Boolean = true;
    sortIndex: Number = 0;
    value: any;
    name: String;
    min: Number;
    max: Number;
    custom: Boolean = false;
    possibleValues: any[];
    required: Boolean = false;
    label: string = '';
    rows: Number = 1;
    fullLine: Boolean = false;
}
