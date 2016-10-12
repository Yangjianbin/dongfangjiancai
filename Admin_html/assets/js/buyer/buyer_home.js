
/**
 * 获取用户信息
 */
function getUserInformation() {
	var userId = 10;
	$.ajax({
		type : "post",
		url : "../../user/getUserInfo.do?Id=" + userId,
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.code == '000000') {
				$('.mobile').text(data.obj.cellPhone);
				$(".user").text(data.obj.realName);
				$(".user img").attr("src",data.obj.photo);
				getEnterpriseInfo();
			}
		}
	});
}
/**
 * 获取企业信息
 */
function getEnterpriseInfo(){
	var userId = 1;
	$.ajax({
		type : "post",
		url : "../../user/getEnterpriseInfo.do?userid=" + userId,
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.code == '000000') {
				$("#EnterpriseName").text(data.obj.companyName);
				if(data.obj.status == 2){
					$("#VerifiedStatus").show();
				}else{
					$("#VerifiedStatus").hide();
				}
			}
		}
	});
}