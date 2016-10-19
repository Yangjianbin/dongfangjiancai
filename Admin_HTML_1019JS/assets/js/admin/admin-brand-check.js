$(function(){
    
    $('#refuse').click(function(){
        $.dialog({
            title:'拒绝',
            cancel:function(){},
            lock:true,
            content:document.getElementById('refuse_content')
        })
    });
})