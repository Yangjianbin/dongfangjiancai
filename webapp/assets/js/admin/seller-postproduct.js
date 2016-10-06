$(function(){
    $('#collapse').on('show.bs.collapse', function () {
        $('.cate .col').addClass('slide');
    }).on('hide.bs.collapse', function () {
        $('.cate .col').removeClass('slide');
    });
    
    //切换分类，异步加载数据.....
    $('.select_cate li').click(function(){
        !$(this).is('.active') && $(this).addClass('active') && $(this).siblings('li').removeClass('active')
    })
    
    $('.submit').click(function(){
        $.dialog({
            title:'温馨提示',
            content:'您好！通过认证 即可发布您的商品！',
            ok:function(){
            },
            cancel:function(){
                location.href="./AddProduct.html"
            },
            okVal:'去认证',
            lock:true
        })
    })
    
})