$(function(){
    $('.status button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active')
    });
    $('#add_remark').click(function(){
        $.dialog({
            title:'添加备注',
            lock:true,
            width:700,
            content:document.getElementById('add_remark_content')
        })
    });
    $('#unpush').click(function(){
        $.dialog({
            title:'撤回推送',
            ok:function(){},
            cancel:function(){},
            lock:true,
            okVal:'撤回',
            width:500,
            height:100,
            content:'<p style="text-align:center;font-size:14px;">提示：订单 <span class="highlight"> 2345325 </span> 已推送小西瓜公司，请确认是否撤回</p>'
        })
    });

    $('#push').click(function(){
        $.dialog({
            title:'推送订单',
            ok:function(){},
            cancel:function(){},
            lock:true,
            okVal:'确认推送',
            width:500,
            height:100,
            content:'<p style="text-align:center;font-size:14px;">提示：请确认将订单3333 推送至小西瓜公司账户(xxxx)</p><p style="text-align:center;color:#888;">温馨提示：推送订单号，会xxxxxxxxxxxxxx</p>'
        })
    });

    $('#close').click(function(){
        $.dialog({
            title:'温馨提示',
            ok:function(){},
            cancel:function(){},
            lock:true,
            width:400,
            height:100,
            content:'<p style="text-align:center;font-size:16px;">您确定要关闭该订单吗？</p>'
        })
    });
});
