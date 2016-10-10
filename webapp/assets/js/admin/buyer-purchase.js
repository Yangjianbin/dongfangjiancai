$(function(){
    $('.bj_btns button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active')
    });

    $('.view').click(function(){
        $.dialog({
            width:1000,
            title:'采购编号：xxxxxx 询价截止日期：2222-22-22（已报价）',
            content:document.getElementById('view_content'),
            lock:true
        });
    });

    $('.alert').click(function(){
        $.dialog({
            width:400,
            title:'温馨提示',
            content:document.getElementById('alert_content'),
            lock:true,
            ok:function(){},
            cancel:function(){}
        });
    })
})
