define(["jquery","template","util"], function ($, template, util) {
    //���ø�����ʾ
    util.setMenu("/course/add")
    //��ȡ�γ�id
    var csId = util.searchStr("cs_id");

    //��ȡ����
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