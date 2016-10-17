$(function() {
    $('#update_pwd').click(function(){
      $.dialog({
          title:'修改密码',
          lock:true,
          ok:function(){},
          cancel:function(){},
          content:document.getElementById('update_pwd_content')
      })
  });
})
