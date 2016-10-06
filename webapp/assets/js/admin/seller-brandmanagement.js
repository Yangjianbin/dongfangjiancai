$(function(){
    $('.switch button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active')
        $(this).index() == 1 ? $('.new_switch').show() && $('.have_switch').hide() :$('.new_switch').hide() && $('.have_switch').show()

    })
    $('.submit').click(function(){
        $.dialog({
            title:'新增品牌',
            ok:function(){},
            cancel:function(){},
            okVal:'继续新增',
            cancelVal:'返回列表',
            content:'恭喜你，品牌提交成功 等待审核'
        })
        return false;
    });
})
