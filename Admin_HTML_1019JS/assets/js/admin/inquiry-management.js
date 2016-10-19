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
        url: '/WMb2b-bizshop/inquiry/getInquiryList.do',
        nowrap: false,
        rownumbers: true,
        NoDataMsg: '没有找到符合条件的数据',
        border: false,
        fit: true,
        fitColumns: true,
        pagination: true,
        idField: "Id",
        pageSize: 15,
        pageNumberName:"page",
        pageSizeName: "size",
        backDataName:"data",
        totalName:"totalNum",
        pagePosition: 'bottom',
        pageNumber: 1,
        queryParams: { userId:0,companyId:0,title: $("#txtTitle").val(), 
        	startTime: $("#inputStartDate").val(), endTime: $("#inputEndDate").val(), state: _status},
        columns:[[
            { field: "inquirySheetCode", title: "询价编号", width: 80, align: "center" },
            { field: "title", title: "工程名称", width: 80, align: "center" },
            { field: "publishDate", title: "提交日期", width: 80, align: "center" },
            { field: "quotationEndDate", title: "询价截止日期", width: 80, align: "center" },
            { field: "stateStr", title: "状态", width: 80, align: "center"},
            { field: "operation", operation: true, title: "操作", width: 80,
            	formatter: function (value, row, index) {
	                var code = row.inquirySheetCode.toString();
	                var html = ["<span class=\"btn-a\" > "];
	                html.push("<a href='javascript:modifyInquiry(\"" + code + "\")'>修改</a>");
	                html.push("<a href='javascript:closeInquiry(\"" + code + "\")'>关闭</a>");
	                html.push("</span>");
	                return html.join("");
	            }
            }
        ]]
    });
}
function modifyInquiry(code){
	$.cookie('modifyInquiryCode', code); 
	window.location.href="ModifyInquiry.html";
}
function closeInquiry(code){
	$.ajax({
		type : "post",
		url : "/WMb2b-bizshop/inquiry/closeInquiry.do?code=" + code,
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.code == '000000') {
				$.dialog.succeedTips('询价已关闭',function(){
					window.location.href = '/WMb2b-bizshop/pages/buyer/InquiryManagement.html';
				});
			}else{
				$.dialog.errorTips('关闭失败' + data.value);
			}
		}
	});
}
