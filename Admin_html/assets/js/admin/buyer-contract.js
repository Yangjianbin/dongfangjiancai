$(function(){
    $('#htxy').click(function(){
        $.dialog({
            width:700,
            height:700,
            lock:true,
            title:'合同协议',
            content:'<img alt="合同协议图片"/>',
            ok:function(){

            },
            okVal:'确定'

        });
    });

    query();

})


function query() {
    $("#list").hiMallDatagrid({
        url: './ContractList',
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
        queryParams: { title: $(".field_value").val()},
        columns:
        [[
        {
            field: "operation", operation: true, title: "三方电签协议", align: "center",
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var html = ["<span data-id="+id+" class=\"btn-a\" >电签"];
                html.push("</span>");
                return html.join("");
            }
        },
        { field: "StatusName", title: "协议状态", width: 80, align: "left"},
        { field: "TimeBuyer", title: "买家签约时间", width: 80, align: "left"},
        { field: "TimeSeller", title: "卖家签约时间", width: 80, align: "left"},
        { field: "ProjectName", title: "项目名称", width: 120, align: "left" },
        {
            field: "operation", operation: true, title: "操作",
            formatter: function (value, row, index) {
                var id = row.Id.toString();
                var stateName = row.StateName.toString();
                var html = ["<span class=\"btn-a\" > "];
                html.push("<a href='./Detail/" + id + "'>查看协议</a>");
                html.push("<a href='./Detail/" + id + "'>下载</a>");
                html.push("<a href='./Detail/" + id + "'>查看关联订单</a>");
                html.push("</span>");
                return html.join("");
            }
        }
        ]]
    });
}