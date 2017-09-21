define(["jquery","template","util"], function ($,template,util) {
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
            }
        });
    }else {
        //添加讲师
        var html = template("teacherTpl",{operate:"添加讲师"});
        $("#teacherInfo").html(html);
    }

});