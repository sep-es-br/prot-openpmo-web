export class LocaleConfig {

    public currencyMask = {
        prefix: '',
        thousands: '',
        decimal: ''
    }
}
export class Mensage {

}

export const PT_BR_CONFIG = {
    currencyMask: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ '
    },
    name: 'Nome',
    label: 'Rótulo',
    fullName: 'Nome Completo',
    minimum: 'Mínimo',
    maximum: 'Máximo',
    defaultValue: 'Valor padrão',
    sortIndex: 'Índice de ordenação',
    exclusionschema: 'Desculpe, você não pode excluir um esquema não vazio.',
    exclusionsureschema: 'Você tem certeza que quer deletar',
    rows: 'Linhas',
    possiblevalues: 'Valores possíveis',
}

export const EN_CONFIG = {
    currencyMask: {
        decimal: '.',
        thousands: ',',
        prefix: '$ '
    },
    name: 'Name',
    label: 'Label',
    fullName: 'FullName',
    minimum: 'Minimum',
    maximum: 'Maximum',
    defaultValue: 'DefaultValue',
    sortIndex: 'SortIndex',
    exclusionschema: 'Sorry, you can not delete this schema because it is not empty.',
    exclusionsureschema: 'Are you sure to delete',
    rows: 'Rows',
    possiblevalues: 'Possible values',
}
