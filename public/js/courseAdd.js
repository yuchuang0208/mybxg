define(["jquery","template","util","form"], function ($, template, util) {
    //…Ë÷√∏ﬂ¡¡œ‘ æ
    util.setMenu(location.pathname);

    $("#btn").on("click", function () {
        $("#courseForm").ajaxSubmit({
            type: "post",
            url: "/api/course/create",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.code==200) {
                    location.href = "/course/basic?cs_id="+data.result.cs_id;
                }
            }
        });
    })
});