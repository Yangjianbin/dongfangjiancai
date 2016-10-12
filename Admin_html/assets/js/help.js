
$(function () {

	 $.ajax({
			url:'../news/queryCategoryInfo.do?t='+Math.random(),
			type:'post', //数据发送方式
			dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:'',
			success: function(msg){ //成功
				if(msg.code<20000){
					var html ='';
					var obj = msg.obj;
					for(var i in obj ){
						html += '<div class="current">'
						html += '<h4><a href="javascript:newsInfo('+obj[i].id+');" target="_self">'+obj[i].name+'</a></h4>'
						html += ' <ul>'
						var subobj = obj[i].subNesCategory;
						if(subobj != null){
							for(var j in subobj){
								html += '<li class="" data-id="'+subobj[j].id+'"><b></b><a href="javascript:newsInfo('+subobj[j].id+');" target="_self">'+subobj[j].name+'</a></li>'
							}
						}
						html += '</ul>'
						html += '</div>'
					}
                	$('.help_side').html(html);		
				}else{
					//TODO:返回数据为空
				}
			},error: function(){ //失败
				//TODO:返回异常数据
			}
		});
	 
	 newsInfo(1);
	 
});

//新闻列表
var isNewsRequest = false;
function  newsInfo(id){
	if(!isNewsRequest){
		isNewsRequest = true;
		$.ajax({
			url:'../news/newsList.do?t='+Math.random(),
			type:'post', //数据发送方式
			dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:{CategoryId:id},
			success: function(msg){ //成功
				var html ='';
				if(msg.code<20000){
					html+='<h5><span>发表时间</span>标题</h5><ul>'
					var obj = msg.data;
					for(var i in obj ){
						html += ' <li><div><a href="javascript:newsInfoById('+obj[i].id+');">'+obj[i].title+'</a></div> <span>'+obj[i].publishTime+'</span></li>';
					}
					html+='</ul>'
					$('.news-show').html(html);		
				}else{
					html+='<h5><span>发表时间</span>标题</h5><p class="message">'+ msg.value +'</p>';
					$('.news-show').html(html);	
				}
			},error: function(){ //失败
				//TODO:返回异常数据
			},
			complete:function(){
				isNewsRequest = false;
				$('.help_side li').removeClass('current');
				$('.help_side li[data-id='+id+']').addClass('current');
			}
		});
	}
 	
}


//新闻内容
function  newsInfoById(id){
	 $.ajax({
			url:'../news/queryNewsById.do?t='+Math.random(),
			type:'post', //数据发送方式
			dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:{Id:id},
			success: function(msg){ //成功
				if(msg.code<20000){
					var html ='';
					var obj = msg.obj;
					html+='<h3 class="help_tit"><strong>'+obj.title+'</strong></h3><div class="help_box">'+obj.content+'</div>'
					$('.news-show').html(html);		
				}else{
					alert(msg.value);
				}
			},error: function(){ //失败
				//TODO:返回异常数据
			}
		});
}
