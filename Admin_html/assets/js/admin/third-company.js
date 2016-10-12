$(function(){
    $('.labels button').click(function(){
        $(this).is('.active') || $(this).addClass('active').siblings('button').removeClass('active')
    })
})
