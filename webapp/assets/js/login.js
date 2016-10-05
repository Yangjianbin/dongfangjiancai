
$(function () {
    bindSubmitBtn();

    bindCheckCode();

    initUsenameBox();
    $('#loginname').focus();

    $(".form").keydown(function (e) {
        var e = e || event,
        keycode = e.which || e.keyCode;
        if (keycode == 13) {
            submit();
        }
    });
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
    var result = checkUsername() & checkPassword(); //& checkCheckCode();
    if (result) {
        var username = $('#loginname').val();
        var password = $('#password').val();
        var keep = $('#autoLogin').attr('checked');
        var refurl = $('#refurl').val();
        
        var type = $('#loginType').val();//用户名登录 或者验证码登录
        var cellPhone = $('#cellPhone').val();//手机号
        var code = $('#code').val();//验证码
        
        type = '1';
        keep = keep ? true : false;
        
        password = escape(password);
        
        $.post('../User/Login.do?t='+Math.random(), { username: username, password: password, type: type, cellPhone: cellPhone, code: code}, function (data) {
            if (data.code = '000000') {//登录成功
//                $.cookie('Himall-DefaultUserName', username, { path: "/", expires: 365 });
            	
            	var obj = data.obj;
            	if(obj != null){
            		var usertype = obj.userType;
                	
                	if(usertype==0){//跳转 选择角色页面
                		location.href = PATH + "/products。html";
                	}else if(usertype == 1){
                		alert(usertype+"--");
                	}else{
                		alert(usertype+"==")
                	}
            	}else{
            		
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
                    $('#autoentry').css('margin-top', 0);
                }
                else {
                    $('#checkCodeArea').hide();
                    $('#autoentry').removeAttr('style');
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

