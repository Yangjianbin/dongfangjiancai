$(function(){
    $('.submit').click(function(){
        $.dialog({
            title:'商品发布',
            ok:function(){},
            cancel:function(){},
            okVal:'继续发布',
            cancelVal:'返回首页',
            content:'恭喜你，您的商品已发布成功'
        })
        return false;
    })
})