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
