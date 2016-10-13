$(function(){
   
    $('#add_invoice').click(function(){
        $.dialog({
            title:'新增发票信息',
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('add_invoice_content'),
            lock:true
        })
    });
    $('#add_address').click(function(){
        $.dialog({
            title:'新增收货地址',
            ok:function(){},
            cancel:function(){},
            content:document.getElementById('add_address_content'),
            lock:true
            
        })
    });
})