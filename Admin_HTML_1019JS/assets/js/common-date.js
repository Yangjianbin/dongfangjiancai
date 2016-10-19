/**
 * <p> 时间工具 </p>
 *
 * @author changming.Y <changming.yang.ah@gmail.com>
 * @since 2016-10-12 15:44
 */

/**
 * javascript时间对象转换成指定格式字符串
 *
 * @param format 字符串格式 如："YYYY-MM-dd hh:mm:ss"
 * @returns {*}
 */
Date.prototype.format = function (format)
{
    var o =
    {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3)  / 3), // quarter
        "S" : this.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear() + "") .substr(4 - RegExp.$1.length));
    }
    for ( var k in o)
    {
        if (new RegExp("(" + k + ")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * date类型转为指定格式的字符串，默认格式为yyyy-mm-dd hh:mm:ss
 *
 * @param _date
 * @param format
 * @returns {*}
 */
function milliDate2Str(_date,format){
    if (_date==null || _date==undefined || _date==''){
        return;
    }
    if (format==null || format==undefined || format==''){
        format = "yyyy-mm-dd hh:mm:ss";
    }
    var _orderDate = new Date(_date);
    if (_orderDate!=null && _orderDate!=undefined && _orderDate!=''){
        return _orderDate.format(format);
    }
}