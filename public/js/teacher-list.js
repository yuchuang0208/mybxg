define(["jquery","template"], function ($,template) {
    //调接口获取讲师信息
    $.ajax({
        type: "get",
        url: "/api/teacher",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var html = template("teacherInfoTpl",{list:data.result});
            $("#teacherInfo").html(html);
        }
    });
});