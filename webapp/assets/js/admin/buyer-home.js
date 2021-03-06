/// <reference path="jquery-1.11.1.js" />
// JavaScript Document

$(document).ready(function () {

    //头部导航下拉
    $('.navbar-nav .dropdown').hover(function () {
		$(this).addClass('open');
    }, function () {
		$(this).removeClass('open');
	});

    $('.navbar-nav .dropdown-menu').each(function () {
        $(this).css('marginLeft', -$(this).width() / 2)
	});

	//左侧菜单切换
    $('.navbar-nav .dropdown').each(function () { $(this).find('li').eq(0).addClass('current') })

    $('.navbar-nav.navbar-left').find('.dropdown').click(function () {
        var str = $(this).find('.dropdown-menu').html();
		$(this).addClass('active').siblings().removeClass('active').end().find('li').first().addClass('current').siblings().removeClass();;
		$('.aside-list').html(str);

		//默认跳转至第一个二级菜单的链接
		$("iframe").attr("src", $(this).find('li').first().children().attr("href"));

		//修改对应图标
        var ico = 'ico' + ($(this).index() + 1);
		$('.column-icon i').removeClass().addClass(ico);
    });


    $('.aside-list,.navbar-nav .dropdown').on('click', 'li', function () {
        $(this).addClass('current').siblings().removeClass('current');
    });


    $('.nav.navbar-right .dropdown li').click(function () {
        var href = $(this).find('a').attr('href');
        if (typeof (href) == "undefined") {
			return false
        } else {
            $('.nav.navbar-left li').find('a').each(function () {
                if (href == $(this).attr('href')) {
					$(this).parent().click();
                }
			})
		}


    });

	//iframe高度自适应

    var headerHeight = $('body').hasClass('no-topbar') ? 80 : 112;
	$('.content,.aside').height($(window).height()-headerHeight);
    var wWidth = $(window).width();
    if(wWidth < 1200){
        $('.container > .content').css("position", "initial");
        $('.container > .content').css("width", "auto");
    }else{
         $('.container > .content').css('width', (wWidth - 1200)/2 + 1020);
         $('.container > .content').css("position", "fixed");
    }
    
	$(window).resize(function() {
        $('.content,.aside').height($(window).height()-headerHeight);

        var wWidth = $(window).width();
        if(wWidth < 1200){
            $('.container > .content').css("position", "initial");
            $('.container > .content').css("width", "auto");
        }else{
             $('.container > .content').css('width', (wWidth - 1200)/2 + 1020);
             $('.container > .content').css("position", "fixed");
        }

    });



	//初始化模拟点击添加左菜单


	//全屏切换
    var flag = 0;
    var classFull = 'glyphicon-resize-full';
    var classSmall = 'glyphicon-resize-small';
    $('#resize-web').click(function () {

        if ($(this).hasClass('glyphicon-resize-full')) {
            flag = 1;
			$('body').addClass('wide');
			$(this).removeClass(classFull).addClass(classSmall);
        } else {
            flag = 0;
			$('body').removeClass('wide');
			$(this).removeClass(classSmall).addClass(classFull);
		}
        addCookie('resizeWeb', flag, 24)
    });

    var flag = getCookie('resizeWeb');

    if (flag == 1) {
		$('body').addClass('wide');
		$('#resize-web').removeClass(classFull).addClass(classSmall);
	}

    //下拉菜单
    $('.top-bar .dropdown').hover(function () {
        $(this).toggleClass('hover');
    });

});


function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}


function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=v; expires=" + date.toGMTString();
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$(function () {
    var myurl = GetQueryString("url");
    if (myurl != null && myurl.toString().length > 1) {
        var tar = GetQueryString("tar").toLowerCase();
        $(".nav.navbar-left ul li a").each(
            function (index, item) {
                if ($(item).attr("href").toLowerCase().indexOf(tar) >= 0) {
                    $(item).parent().click();
                }
            }
        );
        window.iframe.location.href = myurl;
        //$("#iframe").attr("src", myurl);

    } else {
        //debugger;
        $(".nav li").first().click();
    }
});
