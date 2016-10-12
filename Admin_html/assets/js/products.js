$(function() {
//  $("img.lazy").lazyload({
//	  	 threshold : 0,
//		 failure_limit : 10,
//  		 placeholder : "../images/loading.gif",
//         effect : "fadeIn",
//		 skip_invisible : false
//   });


	  var query=new Object();
	  query.queryKey= $("#searchBox").val();
	  query.type=$(this).attr('data-id');
	  
	  var brid = getParam("brid");
	  if(null != brid && brid != ''){
		  query.brandId=brid;
	  }else{
	// query.brandId=$("#searchBox").val();
	  }
	  var addrname = getUrlParam("addrname");
	  if(null != addrname){
		  query.BirthArea=addrname;
	  }else{
	// query.BirthArea=$("#searchBox").val();
	  }
	  // query.StartMass=$("#searchBox").val();
  	var pid = getParam("pid");
	if(null != pid && pid != ''){
		query.CategoryId=pid;
		queryCondiction(pid);
	}else{
//		query.CategoryId=$("#searchBox").val();
	}
  
//  query.SaleCount=$("#searchBox").val();
	query.priceMax=$("#txtMaxPirce").val();
	query.priceMin=$("#txtMinPirce").val();
//  query.price=$("#searchBox").val();
//  query.salecount=$("#searchBox").val();
//  query.currentPage=$("#searchBox").val();
//  query.pagesize=$("#searchBox").val();
  
  //获取商品 列表
  // $.ajax({
  //     type: "post",
  //     url: "../Product/QueryProductList.do?t="+Math.random(),
  //     data: query,
  //     dataType: "json",
  //     async: false,
  //     success: function (data) {
  //         if (data.code == '000000') {
        	  
  //       	  var obj = data.data;
  //       	  var html='';
  //       	  for(var i in obj){
  //       		  var pic = '';
  //       		  if(obj[i].picts != null){
  //       			  if(obj[i].picts.indexOf('|') != -1){
  //       				  pic = obj[i].picts.split('|')[0];//多张图片
  //       			  }else{
  //       				  pic = obj[i].picts;
  //       			  }
  //       		  }
  //       		  var url ='http://192.165.3.186:8080/WMb2b-bizshop/';
  //       		  html += '<li>';
  //       		  html += '<div class="list-img"><a href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank"><img src="'+url + (null != pic ? pic: '')+'"></a>';
  //       		  html += ' <div class="favour">';
  //       		  html += '<span id="lblOrderCount_326615">已售<b>'+obj[i].saleCount+'</b>件</span>';
  //       		  html += '<a onclick="" id="cancel326615" href="javascript:void();" style="display: none;">已收藏</a>';
  //       		  html += '<a onclick="addFavoriteFun(326615)" id="coll326615" href="javascript:void();" class="heart_f">收藏商品</a>';
  //       		  html += '</div>';
  //       		  html += ' <div class="list-info">';
  //   			  html += '<span class="price"><i>市场指导价：</i>¥ '+obj[i].marketPrice+'<i>/平方米</i></span>';
		// 		  html += '<a class="name" href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank" title="'+obj[i].name+'">'+obj[i].name+'</a>';
		// 		  html += '<a class="shop" href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank">'+obj[i].enterprise+'</a>';
		// 		  html += '<span class="location">'+obj[i].birthArea+'</span>';
		// 		  html += '</div>';
		// 		  html +='</li>';
  //       	  }
  //       		  $('.products .list ul').html(html);
  //         }
  //         else {
  //       	  alert(data.value);
  //         }
  //     }
  // });

  $("#pagination").pagination({
    pageSize: 20,
    showJump: true,
    remote: {
        url: "../product/queryProductList.do?t="+Math.random(),
        params: query,       //自定义请求参数
        beforeSend: function(XMLHttpRequest){
           $('.products .list > ul').html('正在下载数据 ...');
        },
        success: function (data, pageIndex) {
            var obj = data.data;
            var html='';
            for(var i in obj){
              var pic = '';
              if(obj[i].picts != null){
                if(obj[i].picts.indexOf('|') != -1){
                  pic = obj[i].picts.split('|')[0];//多张图片
                }else{
                  pic = obj[i].picts;
                }
              }
              var url ='http://192.165.3.186:8080/WMb2b-bizshop/';
              html += '<li>';
              html += '<div class="list-img"><a href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank"><img src="'+url + (null != pic ? pic: '')+'"></a>';
              html += ' <div class="favour">';
              html += '<span id="lblOrderCount_326615">已售<b>'+obj[i].saleCount+'</b>件</span>';
              html += '<a onclick="" id="cancel326615" href="javascript:void();" style="display: none;">已收藏</a>';
              html += '<a onclick="addFavoriteFun(326615)" id="coll326615" href="javascript:void();" class="heart_f">收藏商品</a>';
              html += '</div>';
              html += ' <div class="list-info">';
              html += '<span class="price"><i>市场指导价：</i>¥ '+obj[i].marketPrice+'<i>/平方米</i></span>';
              html += '<a class="name" href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank" title="'+obj[i].name+'">'+obj[i].name+'</a>';
              html += '<a class="shop" href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank">'+obj[i].enterprise+'</a>';
              html += '<span class="location">'+obj[i].birthArea+'</span>';
              html += '</div>';
              html +='</li>';
            }
            $('.products .list > ul').html(html);
        },
        pageIndexName: 'currentPage', 
        pageSizeName: 'pageSize', 
        totalName:'totalNum'
    }
});
  
  /***************************************************************************************/
  //查询推荐产品 by jiangsg
  query.IsRecommend=1;//热门推荐
  query.pagesize=4;//默认四条记录
  $.ajax({
	  type: "post",
      url: "../product/queryProductList.do?t="+Math.random(),
      data: query,
      dataType: "json",
      async: false,
      success: function (data){
    	  if (data.code == '000000') {
    		  var obj = data.data;
        	  var html='';
        	  for(var i in obj){
        		  var pic = '';
        		  if(obj[i].picts != null){
        			  if(obj[i].picts.indexOf('|') != -1){
        				  pic = obj[i].picts.split('|')[0];//多张图片
        			  }else{
        				  pic = obj[i].picts;
        			  }
        		  }
        		  var url ='http://localhost:8080/WMb2b-bizshop/'
            		  html += '<li>';
            		  html += '<div class="list-img"><a href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank"><img src="'+url + (null != pic ? pic: '')+'"></a></div>';
            		 
            		  html += ' <div class="list-info">';
        			  html += '<span class="price"><i>市场指导价：</i>¥ '+obj[i].marketPrice+'<i>/平方米</i></span>';
    				  html += '<a class="name" href="'+PATH + "/productDetail.html?cid="+obj[i].id+'" target="_blank" title="'+obj[i].name+'">'+obj[i].name+'</a>';
    				  html += '</div>';
    				  html +='</li>';
        	  }
        	  		  $('.hot ul').html(html);
    	  }else{
        	  alert(data.value);
          }
      }
  });
  /***************************************************************************************/
 
  	var valueid = getParam("cid");
  	if(null != valueid && valueid !=''){
  		 $.ajax({
  			url:'../product/queryProductbyId.do?t='+Math.random(),
  			type:'post', //数据发送方式
  			dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
  			data:{Id:valueid},
  			success: function(msg){ //成功
  				if(msg.code<20000){
  					var obj = msg.obj;
  					$('#name h1').html(obj.name);
  					$('#summary-price .value').html('≥'+ obj.startMass);
  					$('#summary-price .price-length-6').html(obj.marketPrice+'元');
  					$('#summary-price .unit').html('/'+obj.unit);
  					
  					$('.dd .pp').html(obj.brandName);
  					$('.dd .gg').html(obj.unit);
  					$('.dd .cd').html(obj.birthArea);
  					$('#addressId').html(obj.birthArea);
  					
  					$('.product-introduce .list').html('<li>'+obj.Advertise+'</li>');
  					$('.article').html('<li>'+obj.detail+'</li>');
  				}else{
  					alert(msg.value);
  				}
  			},error: function(){ //失败
  				//TODO:返回异常数据
  			}
  		});
  	}
  
  $('#addressChoose').click(function () {
	  $.ajax({
	      type: "post",
	      url: "../product/queryRegionId.do?t="+Math.random(),
	      data: query,
	      dataType: "json",
	      async: false,
	      success: function (data) {
	          if (data.code == '000000') {
	          }
	          else {
	        	  alert(data.value);
	          }
	      }
	  });
  });
  
});


function queryCondiction(id){
	// 查询品牌
		$.ajax({
				url:'../categories/queryBrandList.do?t='+Math.random(),
				type:'post', // 数据发送方式
				dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
				data:{CategoryId:id},
				success: function(msg){ // 成功
					if(msg.code<20000){
						$('#prop-chandi').html('');
						var obj = msg.obj;
						var html ='';
						for(var i in obj){
							html += '<li><a href="'+PATH + "/products.html?brid="+obj[i].id+'&pid='+id+'" title="'+ obj[i].name +'">'+ obj[i].name  +'</a></li>';
						}
						$('#attrs_brandlist').html(html);
					}else{
						$('#attrs_brandlist').html('');
//						alert(msg.value);
					}
				},error: function(){ // 失败
					// TODO:返回异常数据
				}
			});
		
		// 查询产地
		$.ajax({
				url:'../product/queryBirthArea.do?t='+Math.random(),
				type:'post', // 数据发送方式
				dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
				data:{categoryId:id},
				success: function(msg){ // 成功
					if(msg.code<20000){
						$('#prop-chandi').html('');
						var obj = msg.obj;
						var html ='';
						for(var i in obj){
							html += '<li><a href="'+PATH + "/products.html?addrname="+(obj[i] !='' ? obj[i] :'其他')+'&pid='+id+'" title="'+ obj[i] +'" title="'+ (obj[i] !='' ? obj[i] :'其他') +'">'+ (obj[i] !='' ? obj[i] :'其他') +'</a></li>';
						}
						$('#prop-chandi').html(html);
					}else{
						$('#prop-chandi').html('');
//						alert(msg.value);
					}
				},error: function(){ // 失败
					// TODO:返回异常数据
				}
			});
  }