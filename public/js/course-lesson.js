define(["jquery","template","util","bootstrap","form"], function ($, template, util) {
    //设置高亮显示
    util.setMenu("/course/add");
    //获取课程id
    var csId = util.searchStr("cs_id");

    //获取数据
    $.ajax({
        type: "get",
        url: "/api/course/lesson",
        data:{cs_id: csId},
        dataType: "json",
        success: function (data) {
            //console.log(data);
            var html = template("lessonTpl",data.result);
            $("#lessonInfo").html(html);

            //添加课程
            $("#lessonAdd").on("click", function () {
                $("#chapterModal").modal();
                var html = template("editLessonTpl",{"opreate":"添加课时"});
                $("#editLessonInfo").html(html);

                //提交
                $("#tijiaoBtn").on("click", function () {
                    $("#lessonForm").ajaxSubmit({
                        type: "post",
                        url: "/api/course/chapter/add",
                        data: {ct_cs_id: csId},
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.code == 200) {
                                location.reload();
                            }
                        }
                    });
                });
            });

            //编辑课程
            $(".editBtn").on("click", function () {
                $("#chapterModal").modal();
                var ctId = $(this).attr("data-ctId");
                //获取数据
                $.ajax({
                    type: "get",
                    url: "/api/course/chapter/edit",
                    data: {ct_id: ctId},
                    dataType: "json",
                    success: function (data) {
                        data.result.opreate = "编辑课时";
                        console.log(data);
                        var html = template("editLessonTpl",data.result);
                        $("#editLessonInfo").html(html);
                        //提交
                        $("#tijiaoBtn").on("click", function () {
                            $("#lessonForm").ajaxSubmit({
                                type: "post",
                                url: "/api/course/chapter/modify",
                                data: {ct_cs_id: csId,ct_id:ctId},
                                dataType: "json",
                                success: function (data) {
                                    console.log(data);
                                    if(data.code == 200) {
                                        location.reload();
                                    }
                                }
                            });
                        });
                    }
                })
            });
        }
    })
});