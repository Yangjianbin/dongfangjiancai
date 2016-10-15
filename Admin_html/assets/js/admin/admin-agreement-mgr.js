$(function(){
    $('.status button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active')
    })

    $('#check').click(function(){
        $.dialog({
            title:'商品审核',
            ok:function(){},
            cancel:function(){},
            okVal:'审核通过',
            cancelVal:'拒绝',
            lock:true,
            content:document.getElementById('check_content')
        })
    });
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

    $('#off').click(function(){
        $.dialog({
            title:'违规下架',
            ok:function(){},
            cancel:function(){},
            okVal:'违规下架',
            cancelVal:'取消',
            lock:true,
            content:document.getElementById('off_content')
        })
    });
})
