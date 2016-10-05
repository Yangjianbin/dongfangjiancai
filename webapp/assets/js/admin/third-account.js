$(function(){
    $('.cabtns button').click(function(){
        $(this).is('.active') || $(this).addClass('active').siblings('button').removeClass('active')
        $(this).index() == 1 ? $('.three_ca_content').eq(0).show().end().eq(1).hide() :  $('.three_ca_content').eq(1).show().end().eq(0).hide()
    });
    $('.agentbtns button').click(function(){
        $(this).is('.active') || $(this).addClass('active').siblings('button').removeClass('active')
        $(this).index() == 1 ? $('.more_info_content .three_ca_content').eq(0).show().end().eq(1).hide() :  $('.more_info_content .three_ca_content').eq(1).show().end().eq(0).hide()
    });
    $('.info_btn').click(function(){
        !$(this).is('.active') ? $(this).addClass('active') && $('.more_info_content').slideDown() : $(this).removeClass('active') && $('.more_info_content').slideUp();
    })
})
