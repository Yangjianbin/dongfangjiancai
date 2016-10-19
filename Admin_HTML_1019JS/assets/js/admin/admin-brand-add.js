$(function(){
    $('.type ul li').click(function(){
        var _this = $(this);
        if(_this.is('.current')) return;
        _this.addClass('current').siblings('li').removeClass('current');
        var idx = _this.index();
        $('.type').find('.type_items .item').eq(idx).addClass('active').siblings('.item').removeClass('active');
    });
    $('.type .item input[type=checkbox]').click(function(){
        var bool = $(this).prop('checked');
        var val = $(this).val();
        if(bool){
            $('.type_selected').append('<span data-val='+val+'>'+val+'</span>');
        }else{
            $('.type_selected').find('span[data-val='+val+']').remove();
        }
    })
})