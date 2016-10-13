$(function(){

    $('#change').click(function(){
        $.dialog({
            title:'客户回访',
            ok:function(){},
            cancel:function(){},
            lock:true,
            content:document.getElementById('change_content')
        })
    })
})
