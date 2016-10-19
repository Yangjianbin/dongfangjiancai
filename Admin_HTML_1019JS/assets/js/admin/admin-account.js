$(function(){
    $('.field_date').datetimepicker();

    $('#add_account').click(function(){
        $.dialog({
            title:'新建账户',
            lock:true,
            ok:function(){},
            cancel:function(){},
            okVal:'提交',
            cancelVal:'取消',
            content:document.getElementById('add_account_content')
        })
    });
    $('#add_remark').click(function(){
        $.dialog({
            title:'添加备注',
            lock:true,
            width:700,
            content:document.getElementById('add_remark_content')
        })
    })
    $('#reset_pwd').click(function(){
        $.dialog({
            title:'重置密码',
            lock:true,
            width:500,
            height:100,
            content:'<div style="font-size:14px;text-align:center;">您确认要重置密码吗?</div>',
            ok:function(){
                $.dialog({
                    title:'重置密码',
                    lock:true,
                    width:500,
                    height:100,
                    ok:function(){},
                    okVal:'确认',
                    content:'<div style="text-align:center;font-size:14px;">恭喜你，当前用户密码已重置成功！<br>初始密码为：123456</div>'
                })
            },
            cancel:function(){},
            okVal:'确认重置密码'

        })
    })

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
