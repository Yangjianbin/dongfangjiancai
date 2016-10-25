$(function(){
    $('.beautiful_checkbox').each(function(){
        var _this = $(this);
        var ison = _this.prop('checked') ? 'on' : '';
        _this.wrap('<div class="beautiful_checkbox_wrap '+ison+'"></div>').
        before('<div class="beautiful_checkbox_btn"></div><span class="beautiful_checkbox_text">开启</span>');
    });
    $(document).on('click','.beautiful_checkbox_wrap',function(){
        var _this = $(this),text =  _this.find('.beautiful_checkbox_text'),b=_this.is('.on');
        text.text(b ? '开启' : '关闭');
        _this.find('input').val(!b);
        !b ? _this.addClass('on') : _this.removeClass('on')
    });
})
