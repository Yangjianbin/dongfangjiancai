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

    query();
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


$(document).on('click', '#search-box  ul > li', function () {
    var _this = $(this);
    _this.addClass('active').siblings().removeClass('active');
    query();
})

function query() {
    var _status = $('#search-box .status ul > li.active').attr('data-id');
    $("#list").hiMallDatagrid({
        url: './InquiryList',
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
        queryParams: { title: $("#txtTitle").val(), startTime: $("#inputStartDate").val(), endTime: $("#inputEndDate").val(), status: _status},
        columns:
        [[
        { field: "InquiryId", title: "询价编号", width: 80, align: "center" },
            { field: "ProjectName", title: "工程名称", width: 80, align: "center" },
            { field: "SubmitTime", title: "提交日期", width: 80, align: "center" },
            { field: "InquiryDeadline", title: "询价截止日期", width: 80, align: "center" },
            { field: "InquiryStatus", title: "状态", width: 80, align: "center" },
        {
            field: "operation", operation: true, title: "操作", width: 80,
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var stateName = row.StateName.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push("<a href='#" + id + "'>修改</a>");
                html.push("<a href='#" + id + "'>删除</a>");
                html.push("</span>");
                return html.join("");
            }
        }
        ]]
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