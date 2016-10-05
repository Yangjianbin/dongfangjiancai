$(function () {
    $.extend(Array.prototype, {
        indexOf: function (o) {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this[i] == o) {
                    return i;
                }
            }
            return -1;
        }, remove: function (o) {
            var index = this.indexOf(o);
            if (index != -1) {
                this.splice(index, 1);
            }
            return this;
        }, removeById: function (filed, id) {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this[i][filed] == id) {
                    this.splice(i, 1);
                    return this;
                }
            }
            return this;
        }
    });
});


function ajaxRequest(option) {
    $.ajax({
        type: option.type,
        url: option.url,
        cache: false,
        data: option.param,
        dataType: option.dataType,
        success: option.success,
        error: option.error
    });
}



function showLoading(msg, delay) {
    /// <param name="msg" type="String">待显示的文本,非必填</param>
    /// <param name="delay" type="Int">延时显示的毫秒数，默认100毫秒显示,非必填</param>
    if (!delay)
        delay = 100;
    var loading = $('<div class="ajax-loading" style="display:none"><table height="100%" width="100%"><tr><td align="center"><p>' + (msg ? msg : '') + '</p></td></tr></table></div>');
    loading.appendTo('body');
    var loadTime = setTimeout(function () {
        if ($(".ajax-loading").length > 0) {
            loading.show();
            $('.container,.login-box').addClass('blur');
        }
    }, delay);
    return {
        close: function () {
            clearTimeout(loadTime);
            loading.remove();
            $('.container,.login-box').removeClass('blur');
        }
    }

}


function QueryString(name) {
    /// 获取QueryString

    var AllVars = window.location.search.substring(1);
    var Vars = AllVars.split("&");
    for (i = 0; i < Vars.length; i++) {
        var Var = Vars[i].split("=");
        if (Var[0] == name) return Var[1];
    }
    return "";
};


function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

//表示全局唯一标识符 (GUID)。
function Guid(g) {
    var arr = new Array(); //存放32位数值的数组
    if (typeof (g) == "string") { //如果构造函数的参数为字符串
        InitByString(arr, g);
    }
    else {
        InitByOther(arr);
    }

    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function (o) {
        if (o && o.IsGuid) {
            return this.ToString() == o.ToString();
        }
        else {
            return false;
        }
    }
    //Guid对象的标记
    this.IsGuid = function () { }
    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function (format) {
        if (typeof (format) == "string") {
            if (format == "N" || format == "D" || format == "B" || format == "P") {
                return ToStringWithFormat(arr, format);
            }
            else {
                return ToStringWithFormat(arr, "D");
            }
        }
        else {
            return ToStringWithFormat(arr, "D");
        }
    }
    //由字符串加载
    function InitByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
            InitByOther(arr);
        }
        else {
            for (var i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }
    }
    //由其他类型加载
    function InitByOther(arr) {
        var i = 32;
        while (i--) {
            arr.push("0");
        }
    }
    /*
    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    */
    function ToStringWithFormat(arr, format) {
        switch (format) {
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                str = str.replace(/,/g, "");
                return str;
            case "B":
                var str = ToStringWithFormat(arr, "D");
                str = "{" + str + "}";
                return str;
            case "P":
                var str = ToStringWithFormat(arr, "D");
                str = "(" + str + ")";
                return str;
            default:
                return new Guid();
        }
    }
}
//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function () {
    var g = "";
    var i = 32;
    while (i--) {
        g += Math.floor(Math.random() * 16.0).toString(16);
    }
    return new Guid(g);
}

//获取区域路径
//eg: /admin/home/index 页面调用此方法后返回 /admin/
function getAreaPath() {
    var path = location.pathname + '/';
    path = path.substring(1, path.length);
    path = path.substring(0, path.indexOf('/'));
    return '/' + path + '/';
}

function htmlDel(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/<[^>]+>/g, "");
    return s;

}

function closefilter() {

    if ($(".clfilterscreen").length > 0 || parent.$(".clfilterscreen").length > 0) {
        $(".clfilterscreen").remove();
        parent.$(".clfilterscreen").remove();
    }
}

function filter(centerwidth, centerheight, url) {
    if ($(document.body).find(".clfilterscreen").length > 0) {
        $(document.body).find(".clfilterscreen").remove();
    }
    var _dom = $("<div class=\"clfilterscreen\" style='width:" + $(window).width() + "px;height:" + $(document).height() + "px;'><div style=\"position:relative;width:" + $(window).width() + "px;height:" + $(document).height() + "px;\"><div class=\"filterdialog\" > <div>     </div></div>");
    var ifmdom = "<iframe name=\"ifr_dialog\" id=\"ifr_dialog\"   src=\"" + url + "\" style=\"border: none;overflow:hidden; width:100%; height:100%; background-color:white;\" scrolling=\"no\" frameborder=\"0\" noresize=\"noresize\"></iframe>";
    $(_dom).css("position", "absolute");
    $(_dom).css("top", 0);
    $(_dom).css("left", 0);
    $(_dom).css("bottom", 0);
    $(_dom).css("right", 0);
    $(_dom).css("z-index", 99999);
    $(_dom).css("transition", "background 200ms ease");
    $(_dom).css("background", "rgba(0, 0, 0, .2)");
    var _filterdialog = $(_dom).find(".filterdialog");
    $(_filterdialog).css("position", "absolute");
    var _centertop = $(window).height() / 2 - centerheight / 2 + $(document).scrollTop();
    var _centerwidth = $(window).width() / 2 - centerwidth / 2;

    $(_filterdialog).css("top", _centertop);
    $(_filterdialog).css("left", _centerwidth);
    $(_filterdialog).width(centerwidth);
    $(_filterdialog).height(centerheight);
    $(_filterdialog).css("z-index", 999990);
    $(_filterdialog).css("background", "#FFF");
    $(_filterdialog).html(ifmdom);
    if ($(document.body).find(".clfilterscreen").length == 0) {
        $(document.body).append(_dom);
    }

}

function detectCapsLock(event) {
    var e = event || window.event;
    var o = e.target || e.srcElement;
    var oTip = $(o).parent().find("img.pwdlock");
    var keyCode = e.keyCode || e.which; // 获取按键的keyCode
    var isShift = e.shiftKey || (keyCode == 16) || false;

    if (
((keyCode >= 65 && keyCode <= 90) && !isShift)
        // Caps Lock 打开，且没有按住shift键
|| ((keyCode >= 97 && keyCode <= 122) && isShift)

        // Caps Lock 打开，且按住shift键
) {
        $(oTip).attr("attr-flag", "1");
        $(oTip).show();
    }
    else
    {
       // $(oTip).hide(); $(oTip).attr("attr-flag", "0");
    }

}
$(function () {
    $("input[type='password']").keypress
        (function (e) {

            detectCapsLock(e);
        });

    $("input[type='password']").keydown(function (event) {
        var e = event || window.event;
        var o = e.target || e.srcElement;
        var oTip = $(o).parent().find("img.pwdlock");
        var keyCode = e.keyCode || e.which; // 获取按键的keyCode
        var iscaplock = (keyCode == 20) ? true : false;
        // 判断shift键是否按住
        if (iscaplock) {
            if (iscaplock && $(oTip).attr("attr-flag") == "1") {
                $(oTip).hide(); $(oTip).attr("attr-flag", "0");
            } else {
                $(oTip).attr("attr-flag", "1");
                $(oTip).show();
            }

        }

    });
})
