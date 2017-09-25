define(["jquery","template","util","datepicker","language","validate","form"], function ($,template,util) {
    //获取id
    var tcId = util.searchStr("tc_id");
    if(tcId) {
        //编辑讲师
        $.ajax({
            type: "get",
            url: "/api/teacher/edit",
            data: {tc_id: tcId},
            dataType: "json",
            success: function (data) {
                //console.log(data);
                data.result.operate = "编辑讲师";
                    var html = template("teacherTpl",data.result);
                    $("#teacherInfo").html(html);
                //表单提交
                submitForm("/api/teacher/update");
            }
        });
    }else {
        //添加讲师
        var html = template("teacherTpl",{operate:"添加讲师"});
        $("#teacherInfo").html(html);
        //表单提交
        submitForm("/api/teacher/add");
    }


    function submitForm(url) {
        $("#teacherForm").validate({
            sendForm : false,
            valid : function () {
                //提交成功作什么
                //console.log(123);
                $(this).ajaxSubmit({
                    type : "post",
                    url : url ,
                    dataType: "json",
                    success: function (data) {
                        if(data.code == 200) {
                            location.href = "/teacher/list";
                        }
                    }
                });
            },
            description: {
                tcName : {
                    required : "用户名不能为空"
                },
                tcPass : {
                    required : "密码不能为空",
                    pattern : "密码必须为6位"
                },
                tcJoinDate : {
                    required :"入职日期不能为空"
                }
            }
        });
    };


    //点击提交按钮渲染并跳转到主页面方法
    /*function submitForm(url) {
        $("#btn-add").on("click", function () {
            $.ajax({
                type: "post",
                url: url,
                data: $("#teacherForm").serialize(),
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code == 200) {
                        location.href = "/teacher/list";
                    }
                }
            });
        });
    };*/

});