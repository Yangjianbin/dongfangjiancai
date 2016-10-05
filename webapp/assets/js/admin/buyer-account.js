$(function(){
    $('#change_phone').click(function(){
        $.dialog({
            width:530,
            title:'更换手机号',
            ok:function(){

            },
            cancel:function(){

            },
            content:document.getElementById('change_phone_content'),
            lock:true
        })
    })

})
