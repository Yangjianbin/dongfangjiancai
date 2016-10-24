$(function(){
    $('#check_all').click(function(){
    
        $('#table :checkbox').prop('checked',$(this).prop('checked'))
    })
})