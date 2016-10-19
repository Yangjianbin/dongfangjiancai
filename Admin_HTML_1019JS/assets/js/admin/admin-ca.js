$(function(){
    $('.field_date').datetimepicker();
    $('#private_ca').click(function () {
        $.dialog({
            title:'个人认证',
            lock:true,
            content:document.getElementById('private_ca_content')
        })
    });
    $('#company_ca').click(function () {
        $.dialog({
            title:'企业认证',
            lock:true,
            content:document.getElementById('private_ca_content')
        })
    });
    $('#ca').click(function () {
        $.dialog({
            title:'CA认证',
            lock:true,
            width:500,
            height:120,
            cancel:function(){},
            ok:function(){},
            okVal:'复制证书编号',
            content:'<p style="text-align:center;font-size:14px;">恭喜你!您的CA申请已通过<br />证书编号：<span class="highlight">KKKKKKKKKKKKKK</span></p>'
        })
    });
})
