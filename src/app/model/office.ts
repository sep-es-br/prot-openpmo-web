import { Schema } from '../model/schema';
import { SchemaTemplate } from '../model/schema-template';

export class Office {
    id: String = "";
    name: String = "";
    shortName: String = "";
    schemas: Schema[] = [];
    schemaTemplates: SchemaTemplate[] = [];
}
