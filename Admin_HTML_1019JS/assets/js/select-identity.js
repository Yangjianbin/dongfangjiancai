
$('.identity .btns button').click(function () {
     var _this = $(this), _type = _this.attr('data-type'), _str='';
     if(_type == '1'){
        _str = '买家服务中心';
     }else if(_type == '2'){
        _str = '卖家服务中心';
     }else if(_type == '3'){
        _str = '第三方配套服务中心';
     }

     $('.identity .selected .enter').attr('data-type', _type);

      $.dialog({
            title: '温馨提示',
            lock: true,
            width: '400px',
            padding: '20px',
            content: ['您确定要入驻东方建材网' + _str + '吗？'].join(''),
            button: [
            {
                name: '取消',
            },
            {
                name: '确定',
                callback:function(){
                	publicAjaxRequest('/WMb2b-bizshop/user/modifyRole.do?userId='+$.cookie("UserId")+"&role="+_type,null, function (data) {
	                	if (data.code == '000000') {
	                	  $('.identity .options').hide();
	                      $('.identity .selected').show();
	                      $('.identity .success b, .identity .enter b').text(_str);
	                	}
	        		});
                }
            },
            ]
        });

});

$('.identity .selected .enter').click(function(){
    var _this = $(this), type = _this.attr('data-type');
      if(type==0){//跳转 选择角色页面
  		location.href = PATH + "/selectIdentity.html";
      	}else if(type == 1){//买家
      		location.href = PATH + "/buyer/index.html";
      	}else if(type == 2){//卖家
      		location.href = PATH + "/seller/index.html";
      	}else if(type == 3){//三方
      		location.href = PATH + "/third/index.html";
      	}
});