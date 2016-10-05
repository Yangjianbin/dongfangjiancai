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

    //点击天数过滤搜索
    $('#search-box .date-filter > ul > li:not(.recent)').on('click', function () {
        var _this = $(this);
        var dt = new Date();
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();

        var startdate = dt;
        var num = _this.attr('data-id');
        switch (num) {
            case '1':
                startdate = dt;
                break;
            case '7':
                startdate = new Date(dt.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '15':
                startdate = new Date(dt.getTime() - 15 * 24 * 60 * 60 * 1000);
                break;
            case '30':
                if (m - 1 <=0) {
                    y = y - 1;
                    m = m-1+12;
                } else {
                    m -= 1
                }
                startdate = new Date(y+'-'+m+'-'+d);
                break;
            case '90':
                if (m - 3 <= 0) {
                    y = y - 1;
                    m = m - 3 + 12;
                } else {
                    m -= 3
                }
                startdate = new Date(y + '-' + m + '-' + d);
                break;
            case '180':
                if (m - 6 <= 0) {
                    y = y - 1;
                    m = m - 6 + 12;
                } else {
                    m -= 6
                }
                startdate = new Date(y + '-' + m + '-' + d);
                break;
            case '360':
                y -= 1;
                startdate = new Date(y + '-' + m + '-' + d);
                break;
        }
        $('.start_datetime').datetimepicker('setDate', startdate);
        $('.end_datetime').datetimepicker('setDate', new Date());
    });

})

$('.nav li').click(function (e) {
    searchClose(e);
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).attr('type') == 'statusTab') {//状态分类
        $("#list").hiMallDatagrid('reload', { complaintStatus: $(this).attr('value') || null });
    };
    $("#searchDiv :input").each(function () {
        $(this).val("");
    });
});

function queryUnAudit() {
    $("#list").hiMallDatagrid({
        url: './UnAuditList',
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
        queryParams: { title: $("#txtTitle").val(), startTime: $("#inputStartDate").val(), endTime: $("#inputEndDate").val() },
        toolbar: /*"#goods-datagrid-toolbar",*/'',
        operationButtons: "#batchOperate",
        columns:
        [[
            { checkbox: true, width: 39 },
            {
                field: "Title", operation: false, title: "项目名称", align: "center",
                formatter: function (value, row, index) {
                    var id = row.Id.toString();
                    var html = ["<span class=\"btn-a\" > "];
                    html.push("<a href='./Detail/" + id + "'>" + row.Title + "</a>");
                    html.push("</span>");
                    return html.join("");
                }
            },
        { field: "CompanyName", title: "采购单位", width: 120, align: "left" },
        { field: "PublishDate", title: "提交时间", width: 120, align: "center" },
        { field: "QuotationEndDate", title: "截止时间", width: 120, align: "center" },
        { field: "StateName", title: "状态", width: 100, align: "center" },
            //{ field: "UserName", title: "提交买家", width: 100, align: "center" },
            {
                field: "operation", operation: true, title: "操作",
                formatter: function (value, row, index) {
                    var id = row.Id.toString();
                    var html = "<span class=\"btn-a\" ><a href='./Detail/" + id + "'>查看</a>"
                            //+ "<span class='close-inquiry' data-id="+id+">关闭</span>"
                            + "</span>";
                    // "<a style='color:#00a1e9;' onclick='verify(" + id + ")'>审核</a>";
                    return html;
                }
            }
        ]]
    });
}

$(document).on('click', '#search-box  ul > li', function () {
    var _this = $(this);
    _this.addClass('active').siblings().removeClass('active');
    query();
})

function query() {
    var _status = $('#search-box .status ul > li.active').attr('data-id');
    var _charge = $('#search-box .charge ul > li.active').attr('data-id');
    var _sheetType = $('#search-box .sheetType ul > li.active').attr('data-id');
    $("#list").hiMallDatagrid({
        url: './InquiryList.json',
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
        queryParams: { title: $("#txtTitle").val(), startTime: $("#inputStartDate").val(), endTime: $("#inputEndDate").val(), status: _status, charge: _charge, sheetType: _sheetType },
        columns:
        [[
        { checkbox: true, width: 39 },
        { field: "Id", title: "询价单号", width: 80, align: "left"},
        {
            field: "Title", operation: false, title: "项目名称", align: "center",
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push("<a href='./Detail/" + id + "'>" + row.Title + "</a>");
                html.push("</span>");
                return html.join("");
            }
        },
        { field: "CompanyName", title: "采购单位", width: 120, align: "left" },
        { field: "PublishDate", title: "提交时间", width: 120, align: "center" },
        { field: "QuotationEndDate", title: "截止时间", width: 120, align: "center" },
        { field: "StateName", title: "状态", width: 100, align: "center" },
        {
            field: "InquiryCostPayStatusName", operation: false, title: "服务费状态",
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var state = row.InquiryCostPayStatusName.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push(state);
                html.push("<a href='./InquiryServiceCostDetail/" + id + "'>查看服务费</a>");
                html.push("</span>");
                return html.join("");
            }
        },
       // { field: "UserName", title: "提交买家", width: 100, align: "center" },
        {
            field: "operation", operation: true, title: "操作",
            formatter: function (value, row, index) {
                console.log('row:　', row);
                var id = row.Id.toString();
                var stateName = row.StateName.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push("<a href='./Detail/" + id + "'>查看</a>");
                if (stateName == "待完善")
                {
                    html.push("<a href='/Home/StandardAddInquirSheet/from=admin/" + id + "'>完善</a>");
                }
                html.push("</span>");
                return html.join("");
            }
        }
        ]]
    });
}


function getInquirySheet(id) {
    $.post("/Admin/QuotationManagement/GetInquirySheetShopId", { id: id }, function (data) {
        debugger;
        if (data.success == true) {

        }
    });
}
function refuse(id, reason) {
    $.post("/Admin/QuotationManagement/Refuse", { id: id, reason: reason }, function (data) {
        if (data.success == true) {
            $.dialog.tips('审核完成');
            $("#btnOk").attr("disabled", true);
            $("#btnNo").attr("disabled", true);
            if ($("#list").length > 0) {
                var pageNo = $("#list").hiMallDatagrid('options').pageNumber;
                $("#list").hiMallDatagrid('reload', { pageNumber: pageNo });
            }
        }
        //else {
        //    $.dialog.tips("审核失败！");
        //}
    });
}

function batchCheck(ids, reason, type) {
    $.post("/Admin/QuotationManagement/BatchAudit", { ids: ids, reason: reason, type: type }, function (data) {
        if (data.success == true) {
            $.dialog.tips('审核完成');
            $("#btnOk").attr("disabled", true);
            $("#btnNo").attr("disabled", true);
            if ($("#list").length > 0) {
                var pageNo = $("#list").hiMallDatagrid('options').pageNumber;
                $("#list").hiMallDatagrid('reload', { pageNumber: pageNo });
            }
        }
    });
}

function querymodel() {
    var obj = new Object();
    obj.inquiryNo = $("#txtInquiryNo").val();
    obj.userName = $("#txtUserName").val();
    obj.status = $("#ulMenu").find("li.active").attr("data-status");
    obj.startTime = $("#inputStartDate").val();
    obj.endTime = $("#inputEndDate").val();
    return obj;
};
function alisten(url, id) {
    $.post("./JudyRecordFile?id=" + id, function (data) {
        if (data.exists) {
            var d = $("a[aid='" + id + "']");
            var _status = $(d).attr("status");

            if (_status == "" || _status == "play") {
                $("#embedcontrol").html("");

                $("a.alisten").each(function () {
                    if ($(this).attr("status") == "stop") {
                        $(this).text("试听");
                        $(this).attr("status", "play");
                    }
                });
                $("#embedcontrol").html("<iframe  frameborder=\"0\" src=\"PlayRecord?id=" + id + "\" style=\"resize:none;\"></iframe>");
                $(d).attr("status", "stop");
                $(d).html("暂停");
                $.post("/Admin/QuotationManagement/UpPlayRecord", { id: id }, function (data) {
                    if (data.Success == true) {
                        queryRecord(querymodel());
                    } else {

                    }

                });
            } else if (_status == "stop") {
                $("#embedcontrol").html("");
                $(d).attr("status", "play");
                $(d).text("试听");
            }

        } else {
            alert("文件不存在!");
        }
    })
}
function alistenclose(id) {
    $.post("/Admin/QuotationManagement/CloseRecord", { id: id }, function (data) {
        if (data.Success == true) {
            $.dialog.tips('指派成功');
        } else {
            $.dialog.tips('关闭失败');
        }

    });
}
function queryRecord(obj) {
    $("#list").hiMallDatagrid({
        url: '/Admin/QuotationManagement/RecordList',
        nowrap: false,
        rownumbers: true,
        NoDataMsg: '没有找到符合条件的数据',
        border: false,
        fit: true,
        fitColumns: true,
        pagination: true,
        idField: "RecordID",
        pageSize: 15,
        pagePosition: 'bottom',
        pageNumber: 1,
        queryParams: obj,
        toolbar: /*"#goods-datagrid-toolbar",*/'',
        operationButtons: "#batchOperate",
        columns:
        [[
            { checkbox: true, width: 39 },
            {
                field: "InquirySheetNo", title: "询价单号", align: "center", width: 150,
                formatter: function (value, row, index) {
                    var id = row.RecordID.toString();
                    var _sheetid = row.InquiryID.toString();
                    var html = ["<span class=\"btn-a\" > "];
                    html.push("<span >" + row.InquirySheetNo + "</span>");
                    //if ((row.Status != "已完善询价单") || (row.Status != "已关闭")) {
                    //    html.push("<a style='color:#00a1e9;' href='./AddStandInquirySheet/" + _sheetid + "'>" + row.InquirySheetNo + "</a>");
                    //} else {
                    //    if (row.InquiryStatus == "-1") {
                    //        html.push("<span >" + row.InquirySheetNo + "</span>");
                    //    } else {
                    //        html.push("<a style='color:#00a1e9;' href='./Detail/" + _sheetid + "'>" + row.InquirySheetNo + "</a>");
                    //    }

                    //}
                    html.push("</span>");
                    return html.join("");
                }
            },
            { field: "BuyerName", title: "采购商", width: 150, align: "center" },
            { field: "InquiryTimeStr", title: "询价时间", width: 100, align: "center" },
            {
                field: "Status", title: "状态", width: 100, align: "center",
                formatter: function (value, row, index) {
                    var id = row.RecordID.toString();
                    var html = ["<span class=\"btn-a\" style=\"width:100px;\" > "];
                    if (row.Status == "已完善询价单") {
                        //查看询价单

                        html.push("<a href=\"Detail/" + row.InquiryID + "\">查看询价单</a>");
                    } else {
                        //完善询价单
                        //html.push("<a href=\"AddStandInquirySheet/" + row.InquiryID + "\">完善询价单</a>");
                        html.push("<a href=\"/Home/StandardAddInquirSheet/from=admin_type=record/" + row.InquiryID + "\">完善询价单</a>");
                    }
                    html.push("<br/>")
                    html.push("<span>" + row.Status + "</span>")
                    html.push("</span>");
                    return html.join("");
                }
            },
            //{ field: "UserName", title: "提交买家", width: 100, align: "center" },
            {
                field: "operation", operation: true, width: 150, title: "操作",
                formatter: function (value, row, index) {
                    var id = row.RecordID.toString();
                    var html = ["<span class=\"btn-a\" style=\"width:150px;\" > "];
                    html.push("<a class=\"alisten \" aid=\"" + id + "\" status=\"\"  url=\"" + row.FilePath + "\"  href=\"javascript:alisten('" + row.FilePath + "','" + id + "');\">试听</a>");
                    if (((row.FilePath + "").length != 0) || (row.FilePath != undefined) || (row.FilePath != "undefined") || (row.FilePath != null) || (row.FilePath != "null")) {
                        html.push("<a href='javascript:downrecordfile(" + id + ",this);'>下载</a>");
                        html.push("<div style=\"display:none;\"><a class=\"adown" + id + "\"  href='./DownRecord?id=" + id + "'>下载</a></div>");
                    }
                    if (row.Status != "已关闭") {
                        html.push("<a href=\"javascript:alistenclose('" + id + "');\">关闭</a>");
                    }
                    html.push("</span>");
                    return html.join("");
                }
            }
        ]]
    });
}

function downrecordfile(id, dom) {
    $.post("./JudyRecordFile?id=" + id, function (data) {
        if (data.exists) {
            location.href = "./DownRecord?id=" + id;
        } else {
            alert("文件不存在!");
        }
    })
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

//编辑询价单
$(document).on('click', '.form-group span.edit', function () {
    var _this = $(this);
    _this.hide().siblings('.save').show();
    _this.hide().siblings('.redirectQuote').show();
    _this.parents('.form-group').find('.quantity').hide();
    _this.parents('.form-group').find('.edit-quantity').show();
    _this.parents('.form-group').find('.price').hide();
    _this.parents('.form-group').find('.edit-price').show();
    _this.parents('.form-group').find('.selected-mode').hide();
    _this.parents('.form-group').find('.mode').show();
})

//选择供应商
$(document).on('change', '.list.dropdown > ul > li input[type=checkbox]', function () {
    var _this = $(this), _ul = _this.parents('ul'), _arr = [];
    var _selected = _ul.find('input:checked');
    _selected.each(function () {
        var _label = $(this).parent().text();
        _arr.push(_label);
    });
    _text = _arr.join('，');
    if (_text == '') {
        _ul.prev().text('选择供应商');
    } else {
        if (_arr.length < 3) {
            _ul.prev().text(_text);
        } else {
            _ul.prev().text('已选择' + _arr.length + '个供应商');
        }
        
    }
});

//验证修改数量/价格有效性,有效重新计算总额
$(document).on('blur', '.form-group .edit-price, .form-group .edit-quantity', function () {
    var _this = $(this);
    if (!verifyFigure(_this)) {
        $.dialog.tips('请输入有效值');
    } else {
        var quantity = _this.parents('ul.details').find('.edit-quantity').val();
        var price = _this.parents('ul.details').find('.edit-price').val();
        _this.parents('ul.details').find('.total').text(parseFloat(quantity) * parseFloat(price));
    }
});

//保存询价单
$(document).on('click', '.form-group span.save', function () {
    var _this = $(this);
    _this.hide().siblings('.edit').show();
    var _priceInput = _this.parents('.form-group').find('.edit-price');
    _priceInput.hide().siblings('.price').show().text(_priceInput.val());

    var _quantityInput = _this.parents('.form-group').find('.edit-quantity');
    _quantityInput.hide().siblings('.quantity').show().text(_quantityInput.val());

    var _modeSelect = _this.parents('.form-group').find('.mode');
    _modeSelect.hide().siblings('.selected-mode').show().text(_modeSelect.find('option:checked').text());

    var _Id = _this.parents().find('.btns .hidProductId').attr('id');
    var inquirySheetId = $('#inquirySheetId').val();
    var ShopId = _this.parents('.form-group').find('.sub-title .ShopId').attr('id');
    var _hasPushed = _this.parents().find('.btns .hidPushStatus').attr('id');
    //---------------------------------------------------------------------------------
    var inquirySheetJson = "{Id:" + _Id + ",InquirySheetId:" + inquirySheetId + ",Price:" + _priceInput.val() + ",Quantity:" + _quantityInput.val() + ",ContainTax:" + _modeSelect.val() + ",ShopId:" + ShopId + ",HasPushed:"+_hasPushed+"}";
    var totalPrice = _quantityInput.val() * _priceInput.val();
    if (totalPrice > 0) {

        $.dialog.confirm('是否确定修改报价？', function () {
            ajaxRequest({
                type: "POST",
                url: '/Admin/QuotationManagement/UpdateQuotationProductByPId',
                param: { 'inquirySheetJson': inquirySheetJson.toString()},
                dataType: "json",
                success: function (data) {
                    if (data.success == true) {
                        $.dialog.tips('修改报价成功！');
                        location.reload(true); 
                    }
                    else {
                        if (data.message)
                            $.dialog.errorTips(data.msg);
                        else
                            $.dialog.errorTips("修改报价失败,请重试！");
                    }
                },
                error: function (e) {
                    $.dialog.errorTips("修改报价失败,请重试！");
                }
            });
        }, function () {/*否*/ location.reload()});
    }
})

//直接报价
$(document).on('click', '.form-group span.redirectQuote', function () {
    var _this = $(this);
    _this.hide().siblings('.edit').show();
    var _priceInput = _this.parents('.form-group').find('.edit-price');
    _priceInput.hide().siblings('.price').show().text(_priceInput.val());

    var _quantityInput = _this.parents('.form-group').find('.edit-quantity');
    _quantityInput.hide().siblings('.quantity').show().text(_quantityInput.val());

    var _modeSelect = _this.parents('.form-group').find('.mode');
    _modeSelect.hide().siblings('.selected-mode').show().text(_modeSelect.find('option:checked').text());
    var inquirySheetId = $('#inquirySheetId').val();
    var _Id = _this.parents().find('.btns .hidProductId').attr('id');
   
    //---------------------------------------------------------------------------------
    var inquirySheetJson = "{Id:" + _Id + ",InquirySheetId:" + inquirySheetId + ",Price:" + _priceInput.val() + ",Quantity:" + _quantityInput.val() + ",ContainTax:" + _modeSelect.val() + "}";
    var totalPrice = _quantityInput.val() * _priceInput.val();
    if (totalPrice > 0) {

        $.dialog.confirm('是否确定修改报价？', function () {
            ajaxRequest({
                type: "POST",
                url: '/Admin/QuotationManagement/RedirectQuote',
                param: { 'inquirySheetJson': inquirySheetJson.toString() },
                dataType: "json",
                success: function (data) {
                    if (data.success == true) {
                        $.dialog.tips('报价成功！');
                        location.reload(true);
                    }
                    else {
                        if (data.message)
                            $.dialog.errorTips(data.msg);
                        else
                            $.dialog.errorTips("报价失败,请重试！");
                    }
                },
                error: function (e) {
                    $.dialog.errorTips("报价失败,请重试！");
                }
            });
        }, function () {/*否*/ location.reload() });
    }
})
//指派供应商
$(document).on('click', '.btns span.assign', function () {
    var _this = $(this), _checked = _this.parents('.sub-title').find('.list input[type=checkbox]:checked');
    if (_checked.length == 0) {
        $.dialog.tips('请选择供应商');
        return;
    } else {
        var _checkedArr = [];
        _checked.each(function () {
            _checkedArr.push($(this).val());
        });
        var shopids = _checkedArr.join(',');
        var productId = _this.parents().find('.btns .hidProductId').attr('id');
        var inquirySheetId = $('#inquirySheetId').val();
        $.post('/Admin/QuotationManagement/ReferQuoteShopsForProduct',
            { "inquirySheetId": inquirySheetId, "productId": productId, "shopids": shopids },
            function (data) {
                if (data.success == true) {
                    $.dialog.tips('指派成功');
                    location.reload(true);
                } else {
                    $.dialog.tips('指派失败 '+data.msg);
                }

        });
    }

});

//指派配套服务
$(document).on('click', '.btns .assign-service', function () {
    var _this = $(this), _parent = _this.parents('.form-group');
    var thirdServiceQuotationSheetIds = "";
    _parent.find('select').each(function () {
        if ($(this).val() != '0')
            thirdServiceQuotationSheetIds += $(this).val() + ",";
    });

    if (thirdServiceQuotationSheetIds == "") {
        $.dialog.tips('请选择第三方配套服务！');
        return;

    } else {

        var _design = _parent.find('select.design').val();
        var _construction = _parent.find('select.construction').val();
        var _installation = _parent.find('select.installation').val();
        var _detection = _parent.find('select.detection').val();
        var _logistics = _parent.find('select.logistics').val();

        var _select ="{ \"logistics\": '"+_logistics+"', \"design\":'"+ _design+"',\"construction\":'"+ _construction+"', \"installation\": '"+_installation+"', \"detection\": '"+_detection+"' }";
        var inquirySheetId = $('#inquirySheetId').val();
        $.post('/Admin/QuotationManagement/ReferQuoteFacilitorForThirdService',
          { "inquirySheetId": inquirySheetId, "thirdServiceKeys": _select },
          function (data) {
              if (data.success == true) {
                  $.dialog.tips('指派成功',function () {
                      location.reload(true);
                  });
                 
              } else {
                  $.dialog.tips(data.msg, function () {
                      location.reload(true);
                  });
              }

          });
         
    }
});

//--推送报价
$(document).on('click', '#btnPushQuotation', function pushQuotationToBuyer() {

    //所有待推送的商品报价单ID，格式如"1001,1002,1003"
    var selectedId = $('.form-group input[name=product]:checked');

    //--获取要推送的产品报价的ID

    if (selectedId.length == 0) {
        $.dialog.tips('请选择要推送的产品！');
        return;

    } else {
        var idArr = [];
        selectedId.each(function () {
            idArr.push($(this).attr('id'))
        })
        var quotedProductIdsForBuyer = idArr.join(',');
        var inquirySheetId = $('#inquirySheetId').val();
        $.post('/Admin/QuotationManagement/PushQuotationToBuyer',
          {"inquirySheetId":inquirySheetId, "quotedProductIdsForBuyer": quotedProductIdsForBuyer },
          function (data) {
              if (data.success == true) {
                  $.dialog.tips('推送成功');
                  location.reload(true);
              } else {
                  $.dialog.tips('推送失败,信息： '+data.msg);
              }

          });

    }

});