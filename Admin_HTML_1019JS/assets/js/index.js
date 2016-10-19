
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
        bannerSlider.prev();
    });
    $('#banner_tabs .flex-next').click(function () {
        bannerSlider.next();
    });
    
    $(document).on("mouseover", ".media-news-box .big-img, .media-news-box .img", function(){
        $(".img-text", this).stop(true).slideDown(500);
        $(".shadow", this).stop(true).slideDown(500);
    });
    $(document).on("mouseout", ".media-news-box .big-img, .media-news-box .img", function(){
        $(".img-text", this).stop(true).slideUp(500);
        $(".shadow", this).stop(true).slideUp(500);
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
		url:'../brands/queryBrandsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:{'isIndexShow':1},
		success: function(msg){ //成功
			if(msg.code<20000){
				 brandJson = msg.obj.sort(function () {
				        return Math.random() > 0.5 ? -1 : 1;
				    });
				    var brandLi = '';
				    var url ='http://192.165.3.186:8080/WMb2b-bizshop/' ;/*+ brandJson[i].logo */
				    for (var i = 0; i < 8; i++) {
				        brandLi += '<li><a target="_blank" href="'+PATH + "/products.html?brid="+ brandJson[i].id + '" title="' + brandJson[i].name + '"><img src="'+url+'assets/images/brand1.jpg"  alt="' + brandJson[i].name + '"></a></li>';
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
		url:'../categories/queryCateGoriesList.do?t='+Math.random(),
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
						colvalue=1;
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
					
					htll +='<div class="item item-'+colvalue+'">';
					
					htll +='<dl><dt><i></i>'+data[i].name+'</dt><dd><a href="'+PATH + "/products.html?pid="+data[i].keyValue[0].id+'" title="'+data[i].keyValue[0].name+'">'+data[i].keyValue[0].name+'</a><a href="'+PATH + "/products.html?pid="+data[i].keyValue[1].id+'" title="'+data[i].keyValue[1].name+'">'+data[i].keyValue[1].name+'</a></dd></dl>';
					htll +='<div class="sub-menu">';
					var keyvalues = data[i].keyValue;
					for(var j in keyvalues){
						htll+='<dl><dt><a href="'+PATH + "/products.html?pid="+keyvalues[j].id+'" title="'+keyvalues[j].name+'">'+keyvalues[j].name+'</a></dt><dd>';
						var subkeyvalues = keyvalues[j].keyValue;
						for(var n in subkeyvalues){
							htll+='<a href="'+PATH + "/products.html?pid="+subkeyvalues[n].id+'" title="'+subkeyvalues[n].name+'">'+subkeyvalues[n].name+'</a>';
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
		url:'../categories/querySupportingServList.do?t='+Math.random(),
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
						colvalue=1;
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
					
					htll +='<dl class="col-'+colvalue+'"><dt><a href="thirdService.html" title="'+data[i].name+'"><span class="title">'+data[i].name+'</span><span class="sub-title">'+subtitle+'</span></a></dt><dd>';
					var keyvalues = data[i].keyValue;
					for(var j in keyvalues){
						htll +='<a href="thirdService.html" title="'+keyvalues[j].name+'">'+keyvalues[j].name+'</a>';
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
    
    /*************************************************************************/
    //东方新闻
    var parm=new Object();
    parm.currentPage =1;
    $.ajax({
    	url:'../news/newsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:parm,
		success:function(data){
			if (data.code == '000000') {
				var obj = data.data;
				var html='';
				for(var i in obj){
					if(i%2 ==0){//
						html +='<div class="news-box">';
					}
		        	html += '<a href="../pages/newsDetail.html?Id='+obj[i].id+'" class="text-news">';
		        	var time=obj[i].publishTime; 
		        	var timearr=time.replace(" ",":").replace(/\:/g,"-").split("-"); 
		        	html += '<p class="time"><span>'+timearr[1]+'.'+timearr[2]+' </span><span>/</span>'+timearr[0]+'</p>';
					html += '<p class="news-title">'+obj[i].title+'</p>';
					html += '<p class="news-text">'+obj[i].simpleDetail+'</p>';
					html += '</a>';
					if( !(i%2 ==0)){
						html +='</div>';
					}
				}
				$('#news').html(html);
			}
		},error: function(){
			alert('error');
		}
    });
    
    //新闻图片点击列表(推荐新闻)
    var parm=new Object();
    parm.currentPage =1;
    parm.isRecommend =1;
    parm.pagesize =5;
    $.ajax({
    	url:'../news/newsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:parm,
		success:function(data){
			if (data.code == '000000') {
				var obj = data.data;
				var html='';
				for(var i in obj){
					if(i==0){
						html+='<a href="newsDetail.html?Id='+obj[i].id+'" class="big-img"><img src="../assets/images/index/big.png">';
						html+='<div class="shadow" style="display:none;">';
						html+='</div>';
						html+='<div class="img-text" style="display:none;">';
						html+=obj[i].title;
						html+='</div>';
						html+='</a>';
					}else if(i==1){
						html+='<a href="newsDetail.html?Id='+obj[i].id+'"  class="video">';
						html+='<video poster="../assets/images/index/video.png" src="images/index/video.mp4"></video>';
						html+='</a>';
					}else{
						html+='<a href="newsDetail.html?Id='+obj[i].id+'" class="img"><img src="'+'..'+obj[i].iconUrl+'">';
						html+='<div class="shadow" style="display:none;">';
						html+='</div>';
						html+='<div class="img-text" style="display:none;">';
						html+= obj[i].title;
						html+='</div>';
						html+='</a>';
					}
				}
				$('.media-news-box').html(html);
			}
		},error: function(){
			alert('error');
		}
    });
    /*************************************************************************/

    
});
