$(function() {
//  $("img.lazy").lazyload({
//	  	 threshold : 0,
//		 failure_limit : 10,
//  		 placeholder : "../images/loading.gif",
//         effect : "fadeIn",
//		 skip_invisible : false
//   });


	
	var thirdType = getParam("thirdType");
	if(thirdType != null && thirdType !='' ){//详情页
		var querylist= new Object();
		if(thirdType != null && thirdType != ''){
			querylist.code = thirdType;
	    }else{
	    	querylist.code = '';
		}
		
		$.ajax({
			url:'../Thirdent/queryRegionByType.do?t='+Math.random(),
			type:'post', // 数据发送方式
			dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:{type:thirdType},
			success: function(msg){ // 成功
				var html = '';
				if(msg.code<20000){
					var obj = msg.obj;
					for(var i in obj){
						html +='<li> <a href="thirdServiceList.html?thirdType='+thirdType+'&RegionId='+obj[i].id+'" title="'+obj[i].provinceName+'">'+obj[i].provinceName+'</a> </li>'
					}
					$('.region .values ul').html(html);
				}else{
					html +='<li> <a href="thirdServiceList.html?thirdType='+thirdType+'&RegionId=" title="其他">其他</a></li>'
					$('.region .values ul').html(html);
				}
			},error: function(){ // 失败
				// TODO:返回异常数据
			}
		});
		
		
		var RegionId = getParam("RegionId");
		if(null != RegionId && RegionId != ''){
			querylist.RegionId = RegionId;
		}else{
			querylist.RegionId = $(this).attr('.prop-attrs .list');
		}
		
		$.ajax({
			url:'../Thirdent/querythirdList.do?t='+Math.random(),
			type:'post', // 数据发送方式
			dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:querylist,
			success: function(msg){ // 成功
				if(msg.code<20000){
					var f1html = '';
					var obj = msg.data;
					for(var i in obj){
						f1html +='<li><a href="#" title="'+obj[i].companyName+' target="_blank""><div class="list-img"><img src="'+obj[i].logo+'" alt="'+obj[i].companyName+'"></div>';
						f1html +='<div class="list-info"><span>'+obj[i].companyName+'</span><span>联系电话：'+obj[i].contactsPhone+'</span><span>公司地址：'+obj[i].regionName+'</span></div>';
						f1html +='</a></li>';
					}
					$('.service .list ul').html(f1html);
				}
			},error: function(){ // 失败
				// TODO:返回异常数据
			}
		});
	} else{
		var query = new Object();
		 //设计,施工,物流
		 query.code = '100001,100002,100004';
	   
		$.ajax({
			url:'../Thirdent/Listindex.do?t='+Math.random(),
			type:'post', // 数据发送方式
			dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
			data:query,
			success: function(msg){ // 成功
				if(msg.code<20000){
					var f1html = '';
					var f2html = '';
					var f3html ='';
					var objpar = msg.obj;
					for(var j in objpar){
						if(objpar[j].id == '100001'){
							var obj = objpar[j].list;
							for(var i in obj){
								f1html +='<li><a href="thirdServiceList.html?thirdType='+objpar[j].id+'" title="'+obj[i].companyName+'"><img src="'+obj[i].logo+'" alt="'+obj[i].companyName+'">';
								f1html +='<div class="text"><span>'+obj[i].companyName+'</span><span>联系电话：'+obj[i].contactsPhone+'</span><span>公司地址：'+obj[i].regionName+'</span></div>';
								f1html +='</a></li>';
							}
						}else if(objpar[j].id == '100004'){
							var obj = objpar[j].list;
							for(var i in obj){
								f2html +='<li><a href="#" title="'+obj[i].companyName+'"><img src="'+obj[i].logo+'" alt="'+obj[i].companyName+'">';
								f2html +='<div class="text"><span>'+obj[i].companyName+'</span><span>联系电话：'+obj[i].contactsPhone+'</span><span>公司地址：'+obj[i].regionName+'</span></div>';
								f2html +='</a></li>';
							}
						}else if(objpar[j].id == '100002'){
							var obj = objpar[j].list;
							for(var i in obj){
								f3html +='<li><a href="#" title="'+obj[i].companyName+'"><img src="'+obj[i].logo+'" alt="'+obj[i].companyName+'">';
								f3html +='<div class="text"><span>'+obj[i].companyName+'</span><span>联系电话：'+obj[i].contactsPhone+'</span><span>公司地址：'+obj[i].regionName+'</span></div>';
								f3html +='</a></li>';
							}
						}
					}
					$('.f1 .list').html(f1html);
					$('.f2 .list').html(f2html);
					$('.f3 .list').html(f3html);
				}else{
					
				}
			},error: function(){ // 失败
				// TODO:返回异常数据
			}
		});
	}
	
});