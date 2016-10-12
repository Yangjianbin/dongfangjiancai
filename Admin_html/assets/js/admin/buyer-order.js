$(function(){
    $('.no_history').hide();
    $('.cancel').click(function(){
        $.dialog({
            width:300,
            height:100,
            lock:true,
            title:'温馨提示',
            content:'您确定要取消该订单吗？',
            ok:function(){

            },
            cancel:function(){

            }
        });
    });

    $('.apply_custom_service').click(function(){
        $.dialog({
            width:960,
            top:'50%',
            title:'订单编号：2343243 供应商：萧山。。',
            ok:function(){
                $.dialog({
                    title:'温馨提示',
                    content:'<div style="text-align:center;font-size:24px;">您的售后申请提交成功！</div>',
                    width:400,
                    height:200,
                    ok:function(){}
                })
            },
            okVal:'满意结束本次售后服务',
            content:document.getElementById('apply_custom_service_content')
        })
    })
    

})
