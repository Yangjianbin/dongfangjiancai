$(function(){

    $(document).on('click','.category i',function(){
        if($(this).is('on')) return ;
        var id = $(this).addClass('on').closest('tr').data('id');
        $('.category tr[data-parent='+id+']').show();
    });
    $(document).on('click','.category i.on',function(){
        var id = $(this).removeClass('on').closest('tr').data('id');
        $('.category tr[data-parent='+id+']').filter(function(){
            $(this).hide().find('i').removeClass('on');
            var id = $(this).data('id');
            $('.category tr[data-parent='+id+']').filter(function(){
                $(this).hide().find('i').removeClass('on');
            })
        })
    });
    $('.delete').click(function(){
        $.dialog({
            title:'删除',
            width:500,
            height:140,
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:'<div><div style="text-align:center;font-size:16px;">您确定要删除装饰材料分类吗？</div><div style="color:#b39a5a;width:280px;margin:20px auto auto auto;line-height:20px">提示：删除后，将影响已使用的该分类的商品，该分类的下级将删除</div></div>'
        })
    })
    $('.add').click(function(){
        $.dialog({
            title:'新增上级',
            lock:true,
            ok:function(){},
            cancel:function(){},
            okVal:'保存',
            cancelVal:'取消',
            content:document.getElementById('add_content')
        })
    });
    $('.edit').click(function(){
        $.dialog({
            title:'编辑',
            lock:true,
            ok:function(){},
            cancel:function(){},
            okVal:'保存',
            cancelVal:'取消',
            content:document.getElementById('add_content')
        })
    });

})
