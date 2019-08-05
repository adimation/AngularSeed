export {}

/* 
decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
thousands_sep: char used as thousands separator, it defaults to ',' when omitted
*/
if (!Number.prototype.hasOwnProperty('toMoney')) {
    Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
    {
        var n = this,
        //if decimal is zero we must take it, it means user does not want to show any decimal
        c = isNaN(decimals) ? 2 : Math.abs(decimals),
        //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
        d = decimal_sep || '.',
        //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
        t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,

        sign = (n < 0) ? '-' : '',

        //extracting the absolute value of the integer part of the number and converting to string
        i = parseInt(n = Math.abs(n).toFixed(c)) + '',

        j = ((j = i.length) > 3) ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : ''); 
    }
}

if (!String.prototype.hasOwnProperty('toBoolean')) {
    String.prototype.toBoolean = function(): boolean
    {
        switch(this.toLowerCase()) {
            case "true":
            case "1":
            case "on":
            case "yes":
                return true;
            default: 
                return false;
        }
    }
}