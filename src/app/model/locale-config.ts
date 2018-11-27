export class LocaleConfig {

    public currencyMask = {
        prefix: '',
        thousands: '',
        decimal: ''
    }
}

export const PT_BR_CONFIG = {
    currencyMask: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$'
    }
}

export const EN_CONFIG = {
    currencyMask: {
        decimal: '.',
        thousands: ',',
        prefix: '$'
    }
}