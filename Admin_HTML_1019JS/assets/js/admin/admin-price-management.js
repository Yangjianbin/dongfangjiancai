//var WM_JAVA_SERVER = 'http://192.165.3.150:8080/WmService/';
var WM_JAVA_SERVER = "";  //--baseActionUri在视图页定义，从控制器中取值
$(function () {
    $("#searchBtn").click(function () { query(); });
    $(".start_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        weekStart: 1,
        minView: 2
    });
    $(".end_datetime").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        weekStart: 1,
        minView: 2
    });

    $('.start_datetime').on('changeDate', function () {
        if ($(".end_datetime").val()) {
            if ($(".start_datetime").val() > $(".end_datetime").val()) {
                $('.end_datetime').val($(".start_datetime").val());
            }
        }
        if ($(".start_datetime").val())
            $('.end_datetime').datetimepicker('setStartDate', $(".start_datetime").val());
    });

    $("#price-iframe").load(function () {
        $('#form-import-price').parents('table').find('.aui_close').click();
        var _body = $(document.getElementById('price-iframe').contentWindow.document.getElementById('import-price'));
        var _response = _body.attr('data-response');
        var _desc = _body.attr('data-desc');
        if (_response && _desc) {
            if (_response == '200') {
                $.dialog.tips(_desc);
                query();
            } else {
                $.dialog.errorTips(_desc);
            }
        }
        
    });

})


function query() {
    $("#list").hiMallDatagrid({
        url: WM_JAVA_SERVER+'sellerquotation/query.do',
        nowrap: false,
        rownumbers: true,
        NoDataMsg: '没有找到符合条件的数据',
        border: false,
        fit: true,
        fitColumns: true,
        pagination: true,
        idField: "Id",
        pageSize: 15,
        pagePosition: 'bottom',
        pageNumber: 1,
        queryParams: { CompanyName: $("#company-name").val(), BrandName: $("#brand-name").val(), ProductName: $("#product-name").val(), BeginDate: $("#inputStartDate").val(), EndDate: $("#inputEndDate").val(), Cn: 0 },
        columns:
        [[
        { field: "CompanyName", title: "企业名称", width: 80, align: "left" },
        { field: "BrandName", title: "品牌", width: 120, align: "center" },
        { field: "ProductName", title: "材料名称", width: 100, align: "center" },
        { field: "EnvLevel", title: "环保", width: 50, align: "center" },
        { field: "Sku", title: "规格", width: 120, align: "center" },
        { field: "Unit", title: "单位", width: 50, align: "center" },
        { field: "Prices", title: "单价(元)", width: 80, align: "center"},
        { field: "ProductCounts", title: "数量", width: 50, align: "center" },
        { field: "CreateDate", title: "录入时间", width: 100, align: "center" },
        { field: "Remark", title: "备注", width: 100, align: "center" },
        {
            field: "operation", operation: true, title: "操作", width: 150, align: "left",
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push("<a class='view' href='javascript:' data-id='" + id + "'>查看</a>");
                html.push("<a class='edit' href='javascript:' data-id='"+id+"'>修改</a>");
                html.push("<a class='remove' href='javascript:' data-id='" + id + "'>删除</a>");
                html.push("</span>");
                return html.join("");
            }
        }
        ]]
    }, '', 'jsonp');
}


function verifyFigure(obj) {
    var val = obj.val();
    var reg = /^\d+(\.\d+)?$/;
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
}

function verifyInt(obj, required) {
    var val = obj.val();
    var reg = /^\d+$/;
    if (!required && val == '') return true;
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
}


$(document).on('blur', '#form-import-price .required input.text', function () {
    var _this = $(this);
    if ($.trim(_this.val()) == "") {
        _this.next().show();
    } else {
        _this.next().hide();
    }
});

$(document).on('blur', '#input-quantity', function () {
    var _this = $(this);
    if (verifyInt(_this)) {
        _this.next().hide();
    } else {
        _this.next().show();
    }
});

$(document).on('blur', '#input-price', function () {
    var _this = $(this);
    if (verifyFigure(_this)) {
        _this.next().text('请输入单价').hide();
    } else {
        if (_this.val() == '') {
            _this.next().text('请输入单价').show();
        } else {
            _this.next().text('请输入数字').show();
        } 
    }
});

function quoteDialog(type, id) {
    // type 1添加 2修改
    var _title = '添加报价', _success = '添加报价成功！', _error = '添加报价失败,请重试！', _url = 'add.do';
    if (type == 2) {
        _title = '修改报价';
        _success = '修改报价成功！';
        _error = '修改报价失败,请重试！';
        _url = 'update.do';
    }

    $.dialog({
        title: _title,
        width: 600,
        lock: true,
        id: 'addPrice',
        content: ['<div class="dialog-form">',
            '<div class="form-group"><form id="form-import-price">',
                '<ul class="field-list"><li class="required"><label for="input-company"><em>*</em>企业名称：</label><input class="form-control text" type="text" id="input-company"><span class="tips">请输入企业名称</span></li>',
                '<li class="required"><label for="input-brand"><em>*</em>品牌：</label><input class="form-control text" type="text" id="input-brand"><span class="tips">请输入品牌信息</span></li>',
                '<li class="required"><label for="input-product"><em>*</em>材料名称：</label><input class="form-control text" type="text" id="input-product"><span class="tips">请输入品名信息</span></li>',
                '<li><label for="input-enviro">环保：</label><input class="form-control text" type="text" id="input-enviro"></li>',
                '<li class="required"><label for="input-size"><em>*</em>规格：</label><input class="form-control text" type="text" id="input-size"><span class="tips">请输入规格</span></li>',
                '<li class="required"><label for="input-unit"><em>*</em>单位：</label><input class="form-control text" type="text" id="input-unit"><span class="tips">请输入单位</span></li>',
                '<li class="required"><label for="input-price"><em>*</em>单价：</label><input class="form-control text" type="text" id="input-price">元<span class="tips">请输入单价</span></li>',
                '<li><label for="input-quantity">数量：</label><input class="form-control text" type="text" id="input-quantity"><span class="tips">请输入整数</span></li>',
                '<li><label for="input-remark">备注：</label><textarea class="form-control" id="input-remark"></textarea></li></ul></form>',
            '</div>',
        '</div>'].join(''),
        padding: '10px',
        button: [
        {
            name: '提交',
            callback: function () {
                var _input = $('#form-import-price .required input.text'), _noVal = 0;
                _input.each(function () {
                    var _this = $(this);
                    if ($.trim(_this.val()) == '') {
                        _this.next().show();
                        _noVal++
                    } else {
                        _this.next().hide();
                    }
                });

                var _errLen = $('#form-import-price .tips:visible').length;

                if (_noVal == 0 && _errLen == 0) {
                    var _CompanyName = $('#input-company').val();
                    var _BrandName = $('#input-brand').val();
                    var _ProductName = $('#input-product').val();
                    var _Unit = $('#input-unit').val();
                    var _Sku = $('#input-size').val();
                    var _Prices = $('#input-price').val();
                    var _ProductCounts = $('#input-quantity').val();
                    var _EnvLevel = $('#input-enviro').val();
                    var _Remark = $('#input-remark').val();
                    var _Cn = 0;
                    var _data = {
                        CompanyName: _CompanyName,
                        BrandName: _BrandName,
                        ProductName: _ProductName,
                        Unit: _Unit,
                        Sku: _Sku,
                        Prices: _Prices,
                        ProductCounts: _ProductCounts,
                        EnvLevel: _EnvLevel,
                        Remark: _Remark,
                        Cn: _Cn
                    };

                    if (type == 2) {
                        _data.Id = id;
                    }
                    
                    $.ajax({
                        dataType: 'jsonp',
                        url: WM_JAVA_SERVER + 'sellerquotation/'+_url,
                        type: 'POST',
                        data: _data,
                        cache: false,
                        success: function (returndata) {
                            $.dialog.tips(_success);
                            query();
                        },
                        error: function (returndata) {
                            $.dialog.errorTips(_error);
                        }
                    });
                } else {
                    return false;
                }
            },
            focus: true
        },
        {
            name: '取消',
            callback: function () {

            }
        }]
    });

    if (type == 2) {
        var _tr = $('#list a.edit[data-id=' + id + ']').parents('tr');
        $('#input-company').val(_tr.find('td:eq(0)').text());
        $('#input-brand').val(_tr.find('td:eq(1)').text());
        $('#input-product').val(_tr.find('td:eq(2)').text());
        $('#input-enviro').val(_tr.find('td:eq(3)').text());
        $('#input-size').val(_tr.find('td:eq(4)').text());
        $('#input-unit').val(_tr.find('td:eq(5)').text());
        $('#input-price').val(_tr.find('td:eq(6)').text());
        $('#input-quantity').val(_tr.find('td:eq(7)').text());
        $('#input-remark').val(_tr.find('td:eq(9)').text());
    }
}

//点击添加报价
$(document).on('click', '#add-quotation', function () {
    quoteDialog(1);
});

//点击修改报价
$(document).on('click', '#list a.edit', function () {
    var _id = $(this).attr('data-id');
    quoteDialog(2, _id);
});

//点击查看报价
$(document).on('click', '#list a.view', function () {
    var _this = $(this), _id = $(this).attr('data-id');
    var _tr = $('#list a.edit[data-id=' + _id + ']').parents('tr');
    $.dialog({
        title: '查看报价',
        width: 600,
        lock: true,
        id: 'viewPrice',
        content: ['<div class="dialog-form">',
            '<div class="form-group"><form id="form-import-price">',
                '<ul class="field-list"><li><label>企业名称：</label><p>' + _tr.find('td:eq(0)').text() + '</p></li>',
                '<li><label>品牌：</label><p>' + _tr.find('td:eq(1)').text() + '</p></li>',
                '<li><label>品名：</label><p>' + _tr.find('td:eq(2)').text() + '</p></li>',
                '<li><label>环保：</label><p>' + _tr.find('td:eq(3)').text() + '</li>',
                '<li><label>规格：</label><p>' + _tr.find('td:eq(4)').text() + '</p></li>',
                '<li><label>单位：</label><p>' + _tr.find('td:eq(5)').text() + '</p></li>',
                '<li><label>单价：</label><p>' + _tr.find('td:eq(6)').text() + '元</p></li>',
                '<li><label>数量：</label><p>' + _tr.find('td:eq(7)').text() + '</p></li>',
                '<li><label>备注：</label><p>' + _tr.find('td:eq(9)').text() + '</p></li></ul></form>',
            '</div>',
        '</div>'].join(''),
        padding: '10px',
    });
});


//点击删除报价
$(document).on('click', '#list a.remove', function () {
    var _this = $(this), _id = _this.attr('data-id');
    var _data = {Id:_id, Cn:0};
    $.dialog.confirm('是否确定删除此条报价？', function () {
        $.ajax({
            dataType: 'jsonp',
            url: WM_JAVA_SERVER + 'sellerquotation/remove.do',
            type: 'GET',
            data: _data,
            cache: false,
            success: function (returndata) {
                $.dialog.tips("删除报价成功！");
                query();
            },
            error: function (returndata) {
                $.dialog.errorTips("删除报价失败,请重试！");
            }
        });
    }, function () { });
});

//点击批量导入按钮
$(document).on('click','#import-xls', function () {
    $.dialog({
        title: '批量导入',
        width:500,
        lock: true,
        id: 'importPrice',
        content: ['<div class="dialog-form">',
            '<div class="form-group"><form id="form-import-price" target="price-iframe" enctype="multipart/form-data" method="post" action="'+WM_JAVA_SERVER+'ReadFile/read.do">',
                '<ul class="field-list"><li>第一步：<a href="/Storage/Excel/t_PriceImpport.xlsx?v=20160920">下载横向excel模板</a> &nbsp;&nbsp; <a href="/Storage/Excel/t_PriceImpport_v.xlsx?v=20160920">下载竖向excel模板</a></li>',
                '<li>第二步：<input id="file-price" name="file" type="file"><input type="hidden" name="Cn" value="0"><input type="hidden" name="callback" value="Res"></li> ',
                '<li>排版：<label class="sub"><input value="0" type="radio" name="type" checked>横向</label><label class="sub"><input value="1" type="radio" name="type">竖向</label></li></ul></form>',
            '</div>',
        '</div>'].join(''),
        padding: '10px',
        button: [
        {
            name: '导入',
            callback: function () {
                $("#form-import-price").submit();
                return false;
                
            },
            focus: true
        },
        {
            name: '取消',
            callback: function () {

            }
        }]
    });
});


