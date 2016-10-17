$(function() {
    $('#delete').click(function(){
        $.dialog({
            title:'删除',
            width:400,
            height:140,
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:'<div><div style="text-align:center;font-size:16px;">您确定要删除该条记录吗？</div></div>'
        })
    })
})
