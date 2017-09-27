define(["jquery","template","util","uploadify","language"], function ($, template, util) {
    //设置高亮显示
    util.setMenu("/course/add")
    //获取课程id
    var csId = util.searchStr("cs_id");
    //flag
    var flag = util.searchStr("flag");

    //查询图片基本信息
    $.ajax({
        type: "get",
        url: "/api/course/picture",
        data: {cs_id: csId},
        dataType: "json",
        success: function (data) {
            console.log(data);
            var html = template("pictureTpl",data.result);
            $("#pictureInfo").html(html);

            //处理图片上传
            $("#myfile").uploadify({
                buttonText: "选择图片",
                width: 80,
                height: "auto",
                buttonClass: "btn btn-success btn-sm",
                swf: "/public/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/cover",
                fileObjName: "cs_cover_original",
                formData: {cs_id:csId},
                onUploadSuccess: function (a,b,c) {
                    //console.log(b);
                }
            });

            //处理图片裁剪

        }
    })
});