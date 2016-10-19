$(function(){
    $(document).on('click','.category i',function(){
        if($(this).is('on')) return ;
        var id = $(this).addClass('on').closest('tr').data('id');
        $('.category tr[data-parent='+id+']').show();
    });
    $(document).on('click','.category i.on',function(){
        var id = $(this).removeClass('on').closest('tr').data('id');
        $('.category tr[data-parent='+id+']').hide();
    });

    $('.add').click(function(){
        $.dialog({
            title:'新增下级',
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
    $('.delete').click(function(){
        $.dialog({
            title:'删除',
            width:500,
            height:140,
            lock:true,
            ok:function(){},
            cancel:function(){},
            content:'<div><div style="text-align:center;font-size:16px;">您确定要删除该分类吗？</div></div>'
        })
    })
})
