$(function(){

        $('#delete').click(function(){
            $.dialog({
                title:'删除',
                ok:function(){},
                cancel:function(){},
                lock:true,
                width:400,
                height:100,
                content:'<p style="text-align:center;font-size:16px;">您确定要删除xxx墙纸吗？</p>'
            })
        });

        $('#check_all').click(function(){
            $('.list').find('input[type=checkbox]').prop('checked', $(this).prop('checked'));
        })
})
