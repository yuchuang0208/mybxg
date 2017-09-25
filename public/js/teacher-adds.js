define(["jquery","template","util","datepicker","language"], function ($, template,util) {

    //获取地址栏中的id
    var tcId = util.searchStr("tc_id");
    if(tcId) {
        //编辑讲师
        $.ajax({
            type: "get",
            url: "/api/teacher/edit",
            data: {tc_id: tcId},
            dataType: "json",
            success: function (data) {
                data.result.operate = "编辑讲师";
                var html = template("teacherTpl",data.result);
                $("#teacherInfo").html(html);
                submitForm("/api/teacher/update");
            }
        })
    }else {
        //添加讲师
        var html = template("teacherTpl",{operate : "添加讲师"});
        $("#teacherInfo").html(html);
        submitForm("/api/teacher/add");
    }


    //提交表单函数
    function submitForm(url) {
        $("#btn-add").on("click", function () {
            $.ajax({
                type: "post",
                url: url,
                data: $("#teacherForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if(data.code == 200) {
                        location.href = "/teacher/list";
                    }
                }
            });
        });
    }



});