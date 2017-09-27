define(["jquery","template","util"], function ($, template, util) {
    //设置高亮显示
    util.setMenu("/course/add")
    //获取课程id
    var csId = util.searchStr("cs_id");

    //获取数据
    $.ajax({
        type: "get",
        url: "/api/course/lesson",
        data:{cs_id: csId},
        dataType: "json",
        success: function (data) {
            console.log(data);
            var html = template("lessonTpl",data.result);
            $("#lessonInfo").html(html);
        }
    })
});