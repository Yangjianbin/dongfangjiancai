$(function(){
    $('.pm_nav li').click(function(){
        !$(this).is('.active') && $(this).addClass('active').siblings('li').removeClass('active')
    })
})