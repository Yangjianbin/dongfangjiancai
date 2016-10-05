
$(function () {

    var left=parseInt($("#news").css("left"));
    var bannerSlider = new Slider($('#banner_tabs'), {
        time: 5000,
        delay: 400,
        event: 'hover',
        auto: true,
        mode: 'fade',
        controller: $('#bannerCtrl'),
        activeControllerCls: 'active'
    });
    var timer;
    $('#banner_tabs .flex-prev').click(function () {
        bannerSlider.prev()
    });
    $('#banner_tabs .flex-next').click(function () {
        bannerSlider.next()
    });
    $(".img-text").hide();
    $(".shadow").hide();
    $(".big-img,.img").hover(function(){
            $(".img-text", this).stop(true,true).slideToggle(500);
            $(".shadow", this).stop(true,true).slideToggle(500);
    });
    $(".prev").click(function(){
        if(left<0){
            $("#news").animate({left:left+360},function ()
            {
                left=parseInt($("#news").css("left"));
            });
        }
    })
    ;$(".next").click(function(){
        if(left>-720){
            $("#news").animate({left:left-360},function () {
                left=parseInt($("#news").css("left"));
            });
        }
    });
    $.ajax({
		url:'../Brands/queryBrandsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:'',
		success: function(msg){ //成功
			if(msg.code<20000){
				 brandJson = msg.obj.sort(function () {
				        return Math.random() > 0.5 ? -1 : 1;
				    });
				    var brandLi = '';
				    for (var i = 0; i < 8; i++) {
				        brandLi += '<li><a target="_blank" href="http:\/\/www.eastjiancai.com/Shop/Home/' + brandJson[i].id + '" title="' + brandJson[i].name + '"><img src="/Storage/Plat/Brand/' + brandJson[i].logo + '" alt="' + brandJson[i].name + '"></a></li>';
				    }
				    var brandUl = $('.categorys .brand > ul');
				    brandUl.empty().append(brandLi);
			}else{
				//TODO:返回数据为空
			}
		},error: function(){ //失败
			//TODO:返回异常数据
		}
	});
    
    //查询产品分类（不包含配套服务）
    $.ajax({
		url:'../Cetegories/queryCateGoriesList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:'',
		success: function(msg){ //成功
			if(msg.code<20000){
				var htll='';
				var data=msg.obj;
				for(var i in data){
					var subtitle;
					var colvalue;
					switch (data[i].id)
					{
					case 1://装饰
						colvalue=1
						break;
					case 31://安装
						colvalue=2;
						break;
					case 124://建筑
						colvalue=3;
						break;
					default:
						colvalue=1;
						break;
					}
					
//					<div class="item item-1">
//					<dl>
//						<dt><i></i>装饰材料</dt>
//						<dd>
//							<a href="#" title="石材">石材石材石材石材石材石材</a>
//							<a href="#" title="陶瓷砖">陶瓷砖陶瓷砖陶瓷砖</a>
//						</dd>
//					</dl>
//					<div class="sub-menu">
//						<dl>
//							<dt><a href="#" title="石材">石材</a></dt>
//							<dd>
//								<a href="#" title="大理石">大理石</a>
//								<a href="#" title="石材制品">石材制品</a>
//								<a href="#" title="花岗岩">花岗岩</a>
//							</dd>
//						</dl>
					htll +='<div class="item item-'+colvalue+'">';
					
					htll +='<dl><dt><i></i>'+data[i].name+'</dt><dd><a href="#" title="'+data[i].keyValue[0].name+'">'+data[i].keyValue[0].name+'</a><a href="#" title="'+data[i].keyValue[1].name+'">'+data[i].keyValue[1].name+'</a></dd></dl>';
					htll +='<div class="sub-menu">'
					var keyvalues = data[i].keyValue;
					for(var j in keyvalues){
						htll+='<dl><dt><a href="#" title="'+keyvalues[j].name+'">'+keyvalues[j].name+'</a></dt><dd>';
						var subkeyvalues = keyvalues[j].keyValue;
						for(var n in subkeyvalues){
							htll+='<a href="#" title="'+subkeyvalues[n].name+'">'+subkeyvalues[n].name+'</a>';
						}
						htll += '</dd></dl>';
					}
					
					htll+='</div></div>';
					
				}
				$("#categorysmenu").append(htll);
			}else{
				//TODO:返回数据为空
			}
		},error: function(){ //失败
			//TODO:返回异常数据
		}
	});
    
    //配套服务
    $.ajax({
		url:'../Cetegories/querySupportingServList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:'',
		success: function(msg){ //成功
			if(msg.code<20000){
				var htll='';
				var data=msg.obj;
				for(var i in data){
					var subtitle;
					var colvalue;
					switch (data[i].id)
					{
					case 468://设计
						colvalue=1
						subtitle='Design';
						break;
					case 470://安装
						colvalue=2;
						subtitle='Installation';
						break;
					case 469://施工
						colvalue=3;
						subtitle='Construction';
						break;
					case 471://物流公司
						colvalue=4;
						subtitle='Logistics';
						break;
					default:
						colvalue=1;
						subtitle='Design';
						break;
					}
					
					htll +='<dl class="col-'+colvalue+'"><dt><a href="#" title="'+data[i].name+'"><span class="title">'+data[i].name+'</span><span class="sub-title">'+subtitle+'</span></a></dt><dd>';
					var keyvalues = data[i].keyValue;
					for(var j in keyvalues){
						htll +='<a href="#" title="'+keyvalues[j].name+'">'+keyvalues[j].name+'</a>';
					}
					htll +='</dd></dl>';
				}
				$("#supportingid").append(htll);
			}else{
				//TODO:返回数据为空
			}
		},error: function(){ //失败
			//TODO:返回异常数据
		}
	});
    
});
