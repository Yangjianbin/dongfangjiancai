var PATH = '/WMb2b-bizshop/pages';
$(function () {

    $(document).on('click', '.top-nav .logout', function () {
        $.removeCookie('Himall-User', { path: '/' });
        $.removeCookie('Himall-SellerManager', { path: "/" });
        location.reload();
    })

    //模拟下拉选择框
    $('.select > .selected').click(function(e){
        e.stopPropagation();
        var _this = $(this);
        _this.next().addClass('up');
        _this.siblings('.select-menu').slideDown(300);
    });
     
    $(document).click(function(){
        $('.select > b.arrow').removeClass('up');
        $('.select-menu').slideUp(300);
    });

    $('.select > .select-menu > li').click(function(e){
        var _this = $(this);
        _this.parents('.select').find('.selected').text(_this.text()).addClass(_this.attr('class'));
    });
    //搜索下拉框
    $('.search .select > .select-menu > li').click(function(e){
        var _this = $(this);
        var _val = _this.attr('data-id');
        $('#searchtype').val(_val);
    });

    //语言选择下拉框
    $('.select.language > .select-menu > li').click(function (e) {
        var _this = $(this);
        if (_this.hasClass('en')) {
            location.href = '/Areas/Web/html/en';
        } else if (_this.hasClass('cn')) {
            location.href = '/';
        }
    });


    $("li[name=di]").click(function () {
        var val = $(this).attr("data-id");
        $("#typeselectedval").attr("rel", val);
        if(val==1)
        {
            $("#searchBox").attr("placeholder", "输入产品名称");
        }
        if(val==2)
        {
            $("#searchBox").attr("placeholder", "输入供应商名称");
        }
        if(val==3)
        {
            $("#searchBox").attr("placeholder", "输入品牌名称");
        }
    })
    $('#searchBtn').click(function () {
        var keyWords = $('#searchBox').val();
        var fileType = $("#typeselectedval").attr("rel");

        if (fileType == 1) {
            if ($.trim(keyWords) != "") {
                location.href = "/search/index?keywords=" + (keyWords ? escape(keyWords) : $('#searchBox').attr('placeholder'));
            } else {
                location.href = "/search/index?keywords=";
            }
        }
        if (fileType == 2) {
            if ($.trim(keyWords) != "") {
                location.href = "/GoldSupplier/List?keywords=" + (keyWords ? escape(keyWords) : $('#searchBox').attr('placeholder'))
            } else {
                location.href = "/GoldSupplier/List?keywords=";
            }
        }
        if (fileType == "询价单") {
            if ($.trim(keyWords) != "") {
                location.href = "/ProcurementPlatform/List?keywords=" + (keyWords ? escape(keyWords) : $('#searchBox').attr('placeholder'))
            } else {
                location.href = "/ProcurementPlatform/List";
            }
        }
        if (fileType == 3) {
            if ($.trim(keyWords) != "") {
                location.href = "/GoldSupplier/List?category=1&keywords=" + (keyWords ? escape(keyWords) : $('#searchBox').attr('placeholder'))
            } else {
                location.href = "/GoldSupplier/List";
            }
        }

    });



     //右下角回到顶部工具条
     var _goTopHTML = '<div class="side-toolbar" id="side-toolbar">\
            <ul><li class="feedback"></li>\
                <li class="call">\
                    <div class="pop">\
                        <span>客服电话 400-006-5216</span><span>投诉电话 13685773609</span><span>投诉电话 0571-87139553</span>\
                    </div>\
                </li>\
                <li class="wechat"><div class="pop"><img src="../assets/images/wechat-app.png" /></div></li>\
                <li class="go-top"></li></ul>\
            </div>';
    if($('#side-toolbar').length == 0){
        $('body').append(_goTopHTML).append('<script type="text/javascript" src="https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9368" charset="utf-8"></script>');
    }

    $(window).on('scroll', function () {
        var st = $(document).scrollTop();
        if (st > 0) {
            $('#side-toolbar .go-top').stop().css({ "visibility": "visible" }).animate({ 'opacity': 1 }, 300);
        } else {
            $('#side-toolbar .go-top').stop().animate({ 'opacity': 0 }, 300, function () {
                $(this).css({ "visibility": "hidden" })
            });
        }
    });
    $('#side-toolbar .go-top').on('click', function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500);
    });
     $('#side-toolbar .feedback').on('click', function () {
        //NTKF.im_openInPageChat('kf_9368_1470123148773')
    });



});
