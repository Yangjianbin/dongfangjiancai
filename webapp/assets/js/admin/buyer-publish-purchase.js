
    $(function () {
        
        $('.datetime').datetimepicker();


    })



 

    var n = $(".divinfo p[name='add']").length;
    if (n < 10) {
        var html = "";
        html += '<p class="up_file" name="add"> <span style="padding-right:100px">';
        html += '<img style="display:none" name="imgfile" src=""><span class="file_name" name="file_name">11111</span></span>';
        html += '<a class="dell" name="deletefile" style="display:none;">删除</a><input type="hidden" name="upfile" value="" />';
        $(this).parents(".divinfo").append(html)

    }

    var categoryJson = null;


    function Delete(obj) {
        //$(".contmain .w1190c .tb td .dell").click(function () {
        debugger;
        var n = $(".tb tbody tr").length;
        if (n >= 2) {
            $(obj).parents("tr").remove();
        }
        if (n == 2) {
            $(obj).parents("tr").remove();
            $(".tb tbody tr").find("span.dell").hide();
        }
        $(".tb tbody tr").each(function () {
            $(this).find("td:first").text($(this).index(".tb tbody tr") + 1);

        });

        //})

    }
    function addtrs() {
        //return;
        //var f = true;
        //$(".contmain .w1190c .tb tbody tr").each(function () {
        //    $(this).find("input[file='inputs']").each(function (index, element) {
        //        if ($(element).val() == "") {
        //            f = false
        //        }
        //    });
        //    if ($(this).find(".textlist").text() == "") {
        //        f = false;
        //    };
        //    /*if($(this).find("input[type='file']").value==""){
        //          f=false;
        //      }*/
        //});
        //if (f) {
        var html = ""
        html += '<tr name="inquirySheet"><td style="text-align: center;"></td><td><input type="text" value="" placeholder="请输入商品名称" ></td>';
        html += '<td class="tdlist"><div  class="list-type c1"> <span class="textlist"></span></div></td>';
        html += '<td class="brand"><input type="text" value="" onkeydown="return false" placeholder="请输入品牌"></td>';
        html += '<td><input type="text" value="" placeholder="请输入规格"></td>';
        html += '<td><input type="text" value="" placeholder="请输入数量" ></td>';
        html += '<td class="unit"><input type="text" value="" placeholder="件、吨" ></td>';
        html += '<td><div class="fillup"><form><button type="button" class="bt">选择文件</button><div class="divfill"><input name="file" type="file"></div><span>未选择</span><input name="imghidden" type="hidden" /></form></div></td>';
        html += '<td><span class="dell">删除</span></td></tr>';
        $(".contmain .w1190c .tb tbody").append(html);
        var len = $(".tb tbody tr[name='inquirySheet']").length;
        if ($(".tb tbody tr[name='inquirySheet']").length > 1) {
            $(".tb tbody tr[name='inquirySheet'] tr td:eq(8) span.dell").show();


        }
        //debugger;
        $(".tb tbody tr[name='inquirySheet']:eq(" + (len - 1) + ") td:eq(7)").find(".fillup form input[type='file']").on("change", function () {
            change($(this));
        });
        //($(".tb tbody tr[name='inquirySheet']:eq(" + (len - 1) + ") td:eq(7)").find(".fillup form input[type='file']"));
        BindData();
    }
    function BindData() {
        var len = $(".tb tbody tr[name='inquirySheet']").length;
        $(".tb tbody tr[name='inquirySheet']").each(function (a, b) {
            $(this).find("td:eq(0)").html((a + 1));
            var $input = $(this).find("td:eq(1) input");
            $input.unbind();
            if (a == len - 1) {
                $input.on("focus", function () {
                    $(this).unbind("blur");
                    $(this).on("blur", function () {
                        if ($(this).val() != "" && $(this).val() != undefined) {
                            addtrs();
                        }

                    });

                });
            }
            $(this).find("td:eq(8)").find("span.dell").unbind();
            $(this).find("td:eq(8)").find("span.dell").on("click", function () {

                if ($(".tb tbody tr[name='inquirySheet']").length == 1) {
                    $(this).hide();
                } else {
                    $(this).parents("tr").remove();
                }
                BindData();

            });
        });
    }
    $(function () {
        // BindData();
        //importData();
    
    });



    $('.add-inquiry').on('click', function(){
        appendInquirys($(".UploadInquirystb"), { GoodName: "", CategoryName: "", BrandName: "", SizeName: "", Num: "", Unit: "" }, 1);
    });

    function deleteinquiry(d) {
        var len = $(".tb tbody tr[name='inquirySheet']").length;
        if (len > 1) {
            $(d).parent().parent().remove();
        }
        else {
            $.dialog.errorTips('最后一条不能删除');
        }
    }

    function appendInquirys(container, _item, index) {
        var _temp = $("[name=inquirySheet]").first().clone();
        
        $(container).append(_temp);
    }



    function dellremove(d) {
        $(d).parent().parent().remove();
    }


