$(function(){
    $('#add_cat').click(function(){
        $.dialog({
            title:'新增经营类目',
            ok:function(){},
            cancel:function(){},
            lock:true,
            content:document.getElementById('add_cat_content')
        })
    })
})