import { Schema } from '../management/schema/Schema';
import { SchemaTemplate } from '../admin/schema-template/SchemaTemplate';

export class Office {
    id: String = "";
    name: String = "";
    shortName: String = "";
    schemas: Schema[] = [];
    schemaTemplates: SchemaTemplate[] = [];
}
