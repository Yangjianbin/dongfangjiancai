$(function(){
    $('.status button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active')
    })
    $('#delete').click(function(){
        $.dialog({
            title:'温馨提示',
            ok:function(){},
            cancel:function(){},
            lock:true,
            width:400,
            height:100,
            content:'<p style="text-align:center;font-size:14px;">您确定要删除xxx墙纸吗？</p>'
        })
    });
    $('#view').click(function(){
        $.dialog({
            title:'查看原因',
            cancel:function(){},
            cancelVal:'关闭',
            lock:true,
            content:document.getElementById('view_content')
        })
    });
})