$(function(){

    //init
    $('.field_date').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        weekStart: 1,
        minView: 2
    });

    query();



    $('#delete').click(function(){
        $.dialog({
            title:'温馨提示',
            ok:function(){},
            cancel:function(){},
            lock:true,
            width:400,
            height:100,
            content:'<p style="text-align:center;font-size:16px;">您确定要删除该文章吗？</p>'
        })
    });
})


function query() {
    var _status = $('#search-box .status ul > li.active').attr('data-id');
    $("#list").hiMallDatagrid({
        url: 'yours_url',
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
        queryParams: { },
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
