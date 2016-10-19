
$(function () {
    checkfullname();

    checkMobile();

    checkCheckCode();

    bindSubmitRegist();

});


function bindSubmitRegist() {
    $('#registsubmit').click(function () {
        var result = checkValid();
        if (result) {
            var username = $('#fullname').val();
            var mobile = $('#cellPhone').val();//手机号
            var checkCode = $('#checkCode').val();
            var email = "";
            var t = $("#sendMobileCode").attr("codetype");
            if (t == "sms") {
                email = "";
            }
            else {
                mobile = "";
            }
//            password = escape(password);
            $.post('../user/register.do?t='+Math.round(Math.random() * 10000), {
            	userName: username,
//                password: password,
            	resultCode: checkCode,
                cellPhone: mobile
            }, function (data) {
                if (data.code > 2000) {
                	var userid = data.obj.id;
                	 $.cookie('wm_user_id', userid, { path: "/", expires: 365 });
                    $.dialog.succeedTips("注册成功！", function () {
                        location.href = PATH+'/setPassword.html';
                    }, 3);
                }
                else {
                    $.dialog.errorTips("注册失败！" + data.value);
                }
            });
        }
    });
}

function bindCheckCode() {
    $('#checkCodeChangeBtn,#checkCodeImg').click(function () {
        var src = $('#checkCodeImg').attr('src');
        $('#checkCodeImg').attr('src', src);
    });
}


function checkValid() {

    var t = $("#sendMobileCode").attr("codetype");
    if (t == "sms") {
        return  checkfullnameIsValid()  &  checkMobileIsValid() & checkCheckCodeIsValid();
    }
    else {
    }
}


function checkfullname() {
    $('#fullname').blur(function () {       
        if ($.trim($(this).val()) != "") {
            $("#fullname_error").hide();           
        } else {
            $("#fullname_error").html("请输入姓名");
            $("#fullname_error").show();
        }
    });
    
}

function checkfullnameIsValid() {

    //var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    var fullName = $('#fullname').val();
    var fullnameError = $("#fullname_error");
    if (!fullName) {
        fullnameError.html("请输入姓名");
        fullnameError.show();
        return false;
    }
    
    return true;
}


function checkCheckCodeIsValid() {
    var checkCode = $('#checkCode').val();
    var errorLabel = $('#checkCode_error');
    checkCode = $.trim(checkCode);

    var result = false;
    if (checkCode) {
        var t = $("#sendMobileCode").attr("codetype");
        var pluginId = "Himall.Plugin.Message.SMS";
        var destination = $("#cellPhone").val();
        if (t == "sms") {
            pluginId = "Himall.Plugin.Message.SMS";
            destination = $("#cellPhone").val();

        }
        else {
            pluginId = "Himall.Plugin.Message.Email";
            destination = $("#email").val();
        }
        $.ajax({
            type: "post",
            url: "../user/checkVelidateCode.do?t="+Math.round(Math.random() * 10000),
            data: {cellPhone: destination, messagetemplate: '10003', code: checkCode},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code == '000000') {
                    errorLabel.hide();
                    $("#checkCode_succeed").addClass("succeed");
                    result = true;
                }
                else {
                    errorLabel.html('验证码不正确或者已经超时').show();
                    $("#checkCode_succeed").removeClass("succeed");
                }
            }
        });
    }
    else {
        errorLabel.html('请输入验证码').show();
        $("#checkCode_succeed").removeClass("succeed");
    }
    return result;
}

function checkCheckCode() {
    var errorLabel = $('#checkCode_error');
    $('#checkCode').focus(function () {
        if ($(this).val() == "") {
            errorLabel.hide();
        }
    }).blur(function () {
        if ($.trim($(this).val()) != "") {
            checkCheckCodeIsValid();
        }
    });
}


function reloadImg() {
    $("#checkCodeImg").attr("src", "/register/getCheckCode?_t=" + Math.round(Math.random() * 10000));
}

function checkMobile() {
    $('#cellPhone').change(function () {
        var cellPhone = $.trim($(this).val());
        if (!cellPhone)
            $('#cellPhone_error').show();
        else
            $('#cellPhone_error').hide();
    }).focus(function () {
        if ($(this).val() == "") {
            $('#cellPhone_info').show();
            $('#cellPhone_error').hide();
        }
    }).blur(function () {
        $('#cellPhone_info').hide();
        $('#cellPhone_error').hide();
        if ($.trim($(this).val()) != "") {
            checkMobileIsValid();
        }
        else
        {
            $('#cellPhone_error').html('请输入手机号码').show();                     
        }
    });
}

function checkMobileIsValid() {
    var result = false;
    var cellPhone = $('#cellPhone').val();
    var errorLabel = $('#cellPhone_error');
    //var reg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    var reg = /^0?1[0-9]{10}$/;
    if (!cellPhone || cellPhone == '手机号码') {
        errorLabel.html('请输入手机号码').show();
        $("#cellPhone_succeed").removeClass("succeed");
        $("#cellPhone_succeed").siblings("i").show();
    }
    else if (!reg.test(cellPhone)) {
        errorLabel.html('请输入正确的手机号码').show();
        $("#cellPhone_succeed").removeClass("succeed");
        $("#cellPhone_succeed").siblings("i").show();
    }
    else {
        $.ajax({
            type: "post",
            url: "../user/checkPhoneExists.do?t="+Math.random(),
            data: {cellPhone: cellPhone},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code < 20000) {
                    errorLabel.hide();
                    $("#cellPhone_succeed").addClass("succeed");
                    $("#cellPhone_succeed").siblings("i").hide();
                    result = true;
                }
                else {
                    errorLabel.html('手机号码 ' + cellPhone + ' 已经被占用').show();
                    $("#cellPhone_succeed").removeClass("succeed");
                    $("#cellPhone_succeed").siblings("i").show();
                }
            }
        });
    }
    return result;
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

function sendCode() {
    var t = $("#sendMobileCode").attr("codetype");
    if (t == "sms") {
        sendMobileCode();

    }
    else {
        sendEmailCode();
    }
}

function sendMobileCode() {
    $('#cellPhone_error').hide();
    if ($("#sendMobileCode").attr("disabled")) {
        return;
    }
    var errorLabel = $('#cellPhone_error');
    var mobile = $("#cellPhone").val();
    var reg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    if (!mobile) {
        $("#cellPhone_error").removeClass().addClass("error").html("请输入手机号");
        $("#cellPhone_error").show();
        return;
    }
    if (!reg.test(mobile)) {
        $("#cellPhone_error").removeClass().addClass("error").html("手机号码格式有误，请输入正确的手机号");
        $("#cellPhone_error").show();
        $("#cellPhone_succeed").removeClass("succeed");
        $("#cellPhone_succeed").siblings("i").show();
        return;
    }

    $.ajax({
        type: "post",
        url: "../user/checkPhoneExists.do?t="+Math.random(),
        data: {cellPhone: mobile},
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code < 20000) {
                errorLabel.hide();
                $("#cellPhone_succeed").addClass("succeed");
                $("#cellPhone_succeed").siblings("i").hide();
                sendmCode();
            }
            else {
                errorLabel.html('手机号码 ' + cellPhone + ' 已经被占用').show();
                $("#cellPhone_succeed").removeClass("succeed");
                $("#cellPhone_succeed").siblings("i").show();
            }
        }
    });
    
}

function CreateScript(src) {
    var Scrip = document.createElement('script');
    Scrip.src = src;
    document.body.appendChild(Scrip);
}


// 手机注册发送验证码
function sendmCode() {
    if ($("#sendMobileCode").attr("disabled") || delayFlag == false) {
        return;
    }
    //var _url = "http://120.27.140.113:8089/smsregister1-" + $("#cellPhone").val() + ".action";
    var _url = "../user/getVelidateCode.do?t="+Math.random();
    jQuery.support.cors = true;
    jQuery.ajax({
        type: "Post",
        url: _url,
        data: {cellPhone: $("#cellPhone").val(), module: "用户注册"},
        success: function (result) {
            if (result.code == '000000') {
                $("#sendMobileCode").attr("disabled", "disabled");
                $("#cellPhone_error").hide();
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

function sendEmailCode() {
    $('#email_error').hide();
    if ($("#sendMobileCode").attr("disabled")) {
        return;
    }
    var errorLabel = $('#email_error');
    var email = $("#email").val();
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!email) {
        $("#email_error").removeClass().addClass("error").html("请输入电子邮箱");
        $("#email_error").show();
        return;
    }
    if (!reg.test(email)) {
        $("#email_error").removeClass().addClass("error").html("电子邮箱格式有误，请输入正确的电子邮箱");
        $("#email_error").show();
        $("#email_succeed").removeClass("succeed");
        $("#email_succeed").siblings("i").show();
        return;
    }

    // 检测电子邮箱是否存在
    $.post('/register/checkEmail', {email: email}, function (data) {
        if (data.result == false) {
            errorLabel.hide();
            $("#email_succeed").addClass("succeed");
            $("#email_succeed").siblings("i").hide();
            sendeCode();
        }
        else {
            errorLabel.html('电子邮箱 ' + mobile + ' 已经被占用').show();
            $("#email_succeed").removeClass("succeed");
            $("#email_succeed").siblings("i").show();
        }
    });

}

// 邮箱发送验证码
function sendeCode() {
    if ($("#sendMobileCode").attr("disabled") || delayFlag == false) {
        return;
    }

    jQuery.ajax({
        type: "post",
        url: "/register/sendCode?pluginId=Himall.Plugin.Message.Email&destination=" + $("#email").val(),
        success: function (result) {
            if (result.success == true) {
                $("#sendMobileCode").attr("disabled", "disabled");
                $("#email_error").hide();
                $("#dyMobileButton").html("120秒后重新获取");

                setTimeout(countDown, 1000);
                $("#sendMobileCode").removeClass().addClass("btn").attr("disabled", "disabled");
                $("#checkCode").removeAttr("disabled");
            }
        }
    });
}

function verifyMobile() {
    $("#select-email").hide();
    $("#select-cellPhone").show();
    $("#sendMobileCode").attr("codetype", "sms");
}

function verifyEmail() {
    $("#select-email").show();
    $("#select-cellPhone").hide();
    $("#sendMobileCode").attr("codetype", "email");
}

function checkEmail() {
    $('#email').change(function () {
        var email = $.trim($(this).val());
        if (!email)
            $('#email_error').show();
        else
            $('#email_error').hide();
    }).focus(function () {
        if ($(this).val() == "") {
            $('#email_info').show();
            $('#email_error').hide();
        }
    }).blur(function () {
        $('#email_info').hide();
        $('#email_error').hide();
        if ($.trim($(this).val()) != "") {
            checkEmailIsValid();
        }
    });
}

function checkEmailIsValid() {
    var result = false;
    var email = $('#email').val();
    var errorLabel = $('#email_error');
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

    if (!email || email == '电子邮箱') {
        errorLabel.html('请输入电子邮箱').show();
        $("#email_succeed").removeClass("succeed");
        $("#email_succeed").siblings("i").show();
    }
    else if (!reg.test(email)) {
        errorLabel.html('请输入正确的电子邮箱').show();
        $("#email_succeed").removeClass("succeed");
        $("#email_succeed").siblings("i").show();
    }
    else {
        $.ajax({
            type: "post",
            url: "/register/checkEmail",
            data: {email: email},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.result == false) {
                    errorLabel.hide();
                    $("#email_succeed").addClass("succeed");
                    $("#email_succeed").siblings("i").hide();
                    result = true;
                }
                else {
                    errorLabel.html('电子邮箱 ' + email + ' 已经被占用').show();
                    $("#email_succeed").removeClass("succeed");
                    $("#email_succeed").siblings("i").show();
                }
            }
        });
    }
    return result;
}