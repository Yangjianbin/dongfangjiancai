
$('#passwordsubmit').click(function () {
            var psw1 = $('#setpsw').val();
            var psw2 = $('#confirmpsw').val();
            alert(psw1)
            if(psw1 != psw2){
            	  $.dialog.errorTips("两次设置的密码不一致,请重新设置！");
            	  return;
            }
            $.post('../User/setPassWordByUserId.do?t='+Math.random(), {
            	userId: $.cookie('wm_user_id'),
                password: psw1
            }, function (data) {
                if (data.code == '000000') {
                    $.dialog.succeedTips("设置密码成功！", function () {
                        location.href = PATH+'/login.html'
                    }, 3);
                }
                else {
                    $.dialog.errorTips("设置密码失败！");
                }
            });
    });

