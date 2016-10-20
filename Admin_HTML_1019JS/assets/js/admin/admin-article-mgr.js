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
            { checkbox: true, width: 39 ,title:'选择'},
            { field: "title", title: "标题", width: 80, align: "center" },
            { field: "category", title: "分类", width: 80, align: "center" },
            { field: "publishDate", title: "是否显示", width: 80, align: "center" },
            { field: "publishDate", title: "发布日期", width: 80, align: "center" },
            { field: "status", title: "状态", width: 80, align: "center"},
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
