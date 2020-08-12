var floatObj = function() {
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0}
        var isNegative = floatNum < 0
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi  = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len    = strfi.substr(dotPos+1).length
        var times  = Math.pow(10, len)
        var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
        ret.times  = times
        if (isNegative) {
            intNum = -intNum
        }
        ret.num = intNum
        return ret
    }
    function operation(a, b, digits, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return result / max
            case 'subtract': //减
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max
            case 'multiply'://乘
            result = (n1 * n2) / (t1 * t2)
            return result
            case 'divide'://除
            result = (n1 / n2) * (t2 / t1)
            return result
        }
    }  
    // 加减乘除的四个接口
    function add(a, b, digits) {
        return operation(a, b, digits, 'add')
    }
    function subtract(a, b, digits) {
        return operation(a, b, digits, 'subtract')
    }
    function multiply(a, b, digits) {
        return operation(a, b, digits, 'multiply')
    }
    function divide(a, b, digits) {
        return operation(a, b, digits, 'divide')
    }
    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();
export default floatObj;