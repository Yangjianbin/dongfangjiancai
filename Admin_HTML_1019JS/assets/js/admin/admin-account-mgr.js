$(function(){
    $('#record').click(function(){
        $.dialog({
            title:'查看操作记录',
            width:700,
            lock:true,
            height:100,
            content:''
        })
    })

    $('#change_phone').click(function(){
        $.dialog({
            title:'更改手机号',
            lock:true,
            height:100,
            content:document.getElementById('change_phone_content'),
            ok:function(){},
            cancel:function(){}
        })
    })
})
