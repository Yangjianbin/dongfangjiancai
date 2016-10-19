$(function(){
    
    var eidtor = UE.getEditor('desc');
    
    
    $('.submit').click(function(){
        $.dialog({
            title:'商品发布',
            width:400,
            height:150,
            ok:function(){},
            cancel:function(){},
            okVal:'继续发布',
            cancelVal:'返回商品管理',
            lock:true,
            content:'<div style="text-align:center;font-size:16px;"><img src="../../assets/img/admin/icon_center_succeed.png" /><br /><br />恭喜您，您的商品发布成功</div>'
        })
    })
})