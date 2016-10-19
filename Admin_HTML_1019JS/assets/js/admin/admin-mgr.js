$(function(){
    $('#add').click(function(){
        $.dialog({
            title:'添加成员',
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('add_content')
        })
    });

    $('#update_pwd').click(function(){
        $.dialog({
            title:'修改密码',
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('update_pwd_content')
        })
    });

    $('#update_auth').click(function(){
        $.dialog({
            title:'修改权限',
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('update_auth_content')
        })
    });

    $('#delete').click(function(){
        $.dialog({
            title:'删除',
            ok:function(){},
            cancel:function(){},
            lock:true,
            width:400,
            height:100,
            content:'<p style="text-align:center;font-size:16px;">您确定要删除xxx墙纸吗？</p>'
        })
    });
})
