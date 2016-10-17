$(function(){
    $('#add_black').click(function(){
        $.dialog({
            title:'添加黑名单',
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('add_black_content')
        })
    });
    $('#view_record').click(function(){
        $.dialog({
            title:'查看操作记录',
            lock:true,
            content:document.getElementById('view_record_content')
        })
    });
    $('#remove_account').click(function(){
        $.dialog({
            title:'删除账户',
            content:'',
            width:500,
            height:100,
            lock:true,
            ok:function(){},
            cancel:function(){},
            okVal:'确认删除当前账号',
            content:'<p style="text-align:center;font-size:14px;">提示：删除当前账号后，原手机号码可重新注册账号</p>'
        })
    })
    $('#repair').click(function(){
        $.dialog({
            title:'还原账户',
            content:'',
            width:500,
            height:100,
            lock:true,
            ok:function(){},
            cancel:function(){},
            okVal:'确认还原',
            content:'<p style="text-align:center;"><span class="highlight">提示：还原后，用户所有的历史数据将被恢复，账户可以重新登录</span></p>'
        })
    })
})