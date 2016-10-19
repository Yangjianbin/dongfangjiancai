$(function() {
	//分页数据
	$("#pagination").pagination({
		 pageSize: 10,
		 showJump: true,
		 remote:{
			 url: "../contract/contractList.do?t="+Math.random(),
	         params: query,       //自定义请求参数
	         beforeSend: function(XMLHttpRequest){
	            $('.products .list > ul').html('正在下载数据 ...');
	         },
	         success:function (data, pageIndex) {
	        	 
	         },
	         pageIndexName: 'currentPage', 
	         pageSizeName: 'pageSize', 
	         totalName:'totalNum'
		 }
	});
	
});