$(function(){
    $('#htxy').click(function(){
        $.dialog({
            width:700,
            height:700,
            lock:true,
            title:'合同协议',
            content:'<img alt="合同协议图片"/>',
            ok:function(){

            },
            okVal:'确定'

        });
    })
})
