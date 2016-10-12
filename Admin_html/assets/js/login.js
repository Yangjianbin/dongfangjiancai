
$(function () {
    bindSubmitBtn();

    bindCheckCode();

    initUsenameBox();
    $('#loginname').focus();

    $(".form").keydown(function (e) {
        var e = e || event,
        keycode = e.which || e.keyCode;
        if (keycode == 13) {
//            if($('.username-login').is(':visible')){
                submit(); 
//            }else{
//                submitMobile();
//            }
        }
    });
});

//切换用户名/手机登录
$('.form .username-login b.login').click(function(){
    $('.username-login').hide();
    $('.mobile-login').show();
});
$('.form .mobile-login b.login').click(function(){
    $('.username-login').show();
    $('.mobile-login').hide();
});

function bindSubmitBtn() {
    $(document).on('click', '#loginsubmit', function () {
        submit();
    });

}

function initUsenameBox() {
    var defaultUsername = $.cookie('Himall-DefaultUserName');
    if (defaultUsername) {
        $('#loginname').val(defaultUsername);
        $('#password').focus();
    }
    var userName = $('#userName').val();
    if (!userName)
    {
        $('#loginname').val(userName);
        $('#password').focus();
    }
}

function submit() {
	var result = false;
	if($('.username-login').is(':visible')){
		result = checkUsername() & checkPassword();
	}else{
		result = submitMobile();
	}
	
    if (result) {
        var username = $('#loginname').val();
        var password = $('#password').val();
        var keep = $('#autoLogin').attr('checked');
        var refurl = $('#refurl').val();
        
        var type = $('#loginType').val();//用户名登录 或者验证码登录
        var cellPhone = $('#mobilenumber').val();//手机号
        var code = $('#checkCode').val();//验证码
        
        keep = keep ? true : false;
        
        password = escape(password);
        if(cellPhone != null && cellPhone != '' 
        	&& code !=null && code != '' ){
        	type = 2
        }else{
        	type = 1
        }
        
        $.post('../user/login.do?t='+Math.random(), { username: username, password: password, type: type, cellPhone: cellPhone, code: code}, function (data) {
            if (data.code = '000000') {//登录成功
//                $.cookie('Himall-DefaultUserName', username, { path: "/", expires: 365 });
            	
            	var obj = data.obj;
            	if(obj != null){
            		var usertype = obj.userType;
                	if(usertype==0){//跳转 选择角色页面
                		location.href = PATH + "/selectIdentity.html";
                	}else if(usertype == 1){//买家
                		location.href = PATH + "/buyer/index.html";
                	}else if(usertype == 2){//卖家
                		location.href = PATH + "/seller/index.html";
                	}else if(usertype == 3){//三方
                		location.href = PATH + "/third/index.html";
                	}
            	}else{
            		 $.dialog.errorTips("登录失败！" + data.value);
            	}
         /*       //弹出登录窗提交的
                if ($('#openLoinDialog').val() == '1')
                {
                    location.reload();
                    return;
                }
                var returnUrl = decodeURIComponent(QueryString('returnUrl')).replace('&amp;', '&');
                if (returnUrl && returnUrl.toUpperCase() != "/UserCenter".toUpperCase()) {
                    if (refurl.length > 0) {
                   
                        if (refurl.toUpperCase() == "/Register".toUpperCase()) {

                            location.href = "/UserCenter";
                            return;
                        }
                        var _refurl = (refurl + "").replace("/Login?returnUrl=", "");
                        location.href = decodeURIComponent(_refurl).replace('&amp;', '&');
                    } else {
                        location.href = returnUrl;
                    }
                    return;
                }
                if (returnUrl.toUpperCase() == "/UserCenter".toUpperCase()) {
                    location.href = returnUrl;
                    return;
                }
                location.href = data.Url;
                
                */

                ////冻结的卖家主账号
                //if (data.Disabled && data.IsSeller && data.IsMainAccount)
                //{
                //    //location.href = sellerUrl; //跳转到卖家中心
                //    return;
                //}
                //var returnUrl = decodeURIComponent(QueryString('returnUrl')).replace('&amp;', '&');                
                //if (returnUrl)
                //    location.href = returnUrl;
                //else if (!data.IsMainAccount && data.ParentSellerId == 0 && data.ParentBuyerId == 0) {
                //    location.href = sellerUrl; //跳转到卖家中心
                //}
                //else if (data.ParentSellerId != 0) {
                //    location.href = sellerUrl; //跳转到卖家中心
                //}
                //else
                //    location.href = '/'; //跳转至买家中心
            }
            else {
                var isFirstShowCheckcode = false;
                refreshCheckCode();
                if (data.errorTimes > data.minTimesWithoutCheckCode) {//需要验证码
                    if ($('#checkCodeArea').css('display') == 'none') {
                        isFirstShowCheckcode = true;
                        $('#checkCode_error').html(data.msg).show();
                    }

                    $('#checkCodeArea').show();
                }
                else {
                    $('#checkCodeArea').hide();
                }
                if (!isFirstShowCheckcode) {
                    $('#loginpwd_error').html(data.msg).show();
                    $('#password').focus();
                }
                else
                    $('#checkCodeBox').focus();

            }
        });
    }
}

function checkCheckCode() {
    var result = false;
    if ($('#checkCodeArea').css('display') == 'none')
        result = true;
    else {
        var checkCode = $('#checkCodeBox').val();
        var errorLabel = $('#checkCode_error');
        if (checkCode && checkCode.length == 4) {
            $.ajax({
                type: "post",
                url: "/login/checkCode",
                data: { checkCode: checkCode },
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.success) {
                        result = true;
                        errorLabel.hide();
                    }
                    else {
                        $('#checkCodeBox').focus();
                        errorLabel.html('验证码错误').show();
                    }
                }
            });
        }
        else {
            $('#checkCodeBox').focus();
            if (!checkCode)
                errorLabel.html('请填写验证码').show();
            else
                errorLabel.html('验证码错误').show();
        }
    }
    return result;
}

function checkUsername() {
    var result = false;
    var username = $('#loginname').val();
    var loginError = $('#loginname_error');
    if (!username) {
        loginError.html('请输入用户名').show();
        $('#loginname').addClass('error-input');
    }
    else {
        result = true;
        loginError.hide();
        $('#loginname').removeClass('error-input');
    }
    return result;
}

function checkPassword() {
    var result = false;
    var password = $('#password').val();
    var passwordError = $('#loginpwd_error');
    if (!password) {
        passwordError.html('请输入密码').show();
        $('#password').addClass('error-input');
    }
    else {
        result = true;
        passwordError.hide();
        $('#password').removeClass('error-input');
    }
    return result;
};

function refreshCheckCode() {
    var path = $('#checkCodeImg').attr('src').split('?')[0];
    path += '?time=' + new Date().getTime();
    $('#checkCodeImg').attr('src', path);
    $('#checkCodeBox').val('');
}

function bindCheckCode() {
    $('#checkCodeImg,#checkCodeChange').click(function () {
        refreshCheckCode();
    });
}


function bindFocus() {
    $('#password').keydown(function () {
        $('#loginpwd_error').hide();
    });

    $('#loginname').keydown(function () {
        $('#loginpwd_error').hide();
    });

    $('#checkCodeBox').keydown(function () {
        $('#checkCode_error').hide();
    });

}

var delayTime = 120;
var delayFlag = true;
function countDown() {
    delayTime--;
    $("#sendMobileCode").attr("disabled", "disabled");
    $("#dyMobileButton").html(delayTime + '秒后重新获取');
    if (delayTime == 1) {
        delayTime = 120;
        $("#mobileCodeSucMessage").removeClass().empty();
        $("#dyMobileButton").html("获取验证码");
        $("#cellPhone_error").addClass("hide");
        $("#sendMobileCode").removeClass().addClass("btn").removeAttr("disabled");
        delayFlag = true;
    } else {
        delayFlag = false;
        setTimeout(countDown, 1000);
    }
}


function submitMobile() {
	  var result = true;
	var cellPhone = $('#mobilenumber').val();
	var errorLabel = $('#mobile_error');
	//验证手机
    var reg = /^0?1[0-9]{10}$/;
    if (!cellPhone || cellPhone == '手机号码') {
        errorLabel.html('请输入手机号码').show();
        $("#mobile_succeed").removeClass("succeed");
        $("#mobile_succeed").siblings("i").show();
        return;
    }
    else if (!reg.test(cellPhone)) {
        errorLabel.html('请输入正确的手机号码').show();
        $("#mobile_succeed").removeClass("succeed");
        $("#mobile_succeed").siblings("i").show();
        return;
    }
    
	//验证验证码
	if ($("#sendMobileCode").attr("disabled") || delayFlag == false) {
		return;
    }
	
	return result;
}

function sendCode(){
	if(submitMobile()){
		var _url = "../user/getVelidateCode.do?t="+Math.random();
	    jQuery.support.cors = true;
	    jQuery.ajax({
	        type: "Post",	
	        url: _url,
	        data: {cellPhone: $("#mobilenumber").val()},
	        success: function (result) {
	            if (result.code == '000000') {
	                $("#sendMobileCode").attr("disabled", "disabled");
	                $("#mobile_error").hide();
	                $("#dyMobileButton").html("120秒后重新获取");
	                setTimeout(countDown, 1000);
	                $("#sendMobileCode").removeClass().addClass("btn").attr("disabled", "disabled");
	                $("#checkCode").removeAttr("disabled");
	            } else {
	                alert(result.value);
	            }
	        }
	    });
	}
}

//手机验证码登录
$(document).on('click', '#loginsubmit-mobile', function () {
    submit();
});





