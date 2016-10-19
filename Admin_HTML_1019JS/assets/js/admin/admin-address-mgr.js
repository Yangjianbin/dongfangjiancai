$(function(){
    $('#add_address').click(function(){
        $.dialog({
            title:'新增收货地址',
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('add_address_content'),
            lock:true
            
        })
    })
})