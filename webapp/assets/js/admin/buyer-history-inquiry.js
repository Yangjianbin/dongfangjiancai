$(function(){
    $('.number button').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('button').removeClass('active');
    });
    $('.price_range .price_range_btn').click(function(){
         !$(this).is('.active') && $(this).addClass('active').siblings('.price_range_btn').removeClass('active');
    })
})