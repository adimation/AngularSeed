export {}

declare global {
    interface Number {
        toMoney(decimals: number, decimal_sep: string, thousands_sep: string): string;
    }
    interface String {
        toBoolean(): boolean;
    }
}